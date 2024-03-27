import { Empty, Form, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderDetailsInput } from "./AcademicHistory";
import { useEffect } from "react";
import { useGetSectionResponse } from "../../hooks/Application hooks/useGetSectionResponse";

export const ImmigrationAndCourtProceedings: React.FC<
  IApplicationFormResponseProps
> = ({ onNextTabItem, subsectionName, form }) => {
  const { id } = useParams();

  const { data: sectionTwoData } = useGetSectionResponse({
    pagination: {
      subsection_name: subsectionName,
    },
    currentUrl: `${id as unknown as number}/sectionthreeresponse`,
  });

  useEffect(() => {
    if (sectionTwoData?.data && sectionTwoData.data.length > 0) {
      const initialValues: Record<string, any> = {};
      sectionTwoData.data.forEach(item => {
        initialValues[item.question.schema_name] = item.response;
      });
      form?.setFieldsValue(initialValues);
    }
  }, [sectionTwoData]);
  
  
  return (
    <>
      {sectionTwoData?.data?.length ? (
       sectionTwoData.data.map(
          (item) =>
            item.subsection_name === subsectionName && (
              <Form.Item
                key={item.id}
                name={item.question.schema_name}
                label={item.question.form_question}
              >
                {renderDetailsInput(
                  item.question.input_type,
                  item.question.options
                 
                )}
              </Form.Item>
            )
        )
      ) : (
        <Empty />
      )}

      <div className="flex justify-end  my-5 py-2">
        <Tooltip title="Click to go to the next section">
          <i
            className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onNextTabItem && onNextTabItem();
            }}
          ></i>
        </Tooltip>
      </div>
    </>
  );
};
