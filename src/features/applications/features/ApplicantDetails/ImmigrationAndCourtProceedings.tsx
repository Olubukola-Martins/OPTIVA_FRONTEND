import { Form, Skeleton, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderDetailsInput } from "./AcademicHistory";
import { useEffect } from "react";
import { useGetSectionResponse } from "../../hooks/Application hooks/useGetSectionResponse";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "../NewApplication/NewApplicantBrief";

export const ImmigrationAndCourtProceedings: React.FC<
  IApplicationFormResponseProps
> = ({ onNextTabItem, subsectionName, form }) => {
  const { id } = useParams();

  const { data: sectionThreeData } = useGetSectionResponse({
    subsection_name: subsectionName,
    currentUrl: `${id as unknown as number}/sectionthreeresponse`,
  });

  console.log("sub section name", subsectionName);
  console.log("section 3 response", sectionThreeData);

  const { data: sectionThreeQuestions, isLoading } = useGetSingleQuestion({
    id: 1,
    endpointUrl: "section-three",
  });
  console.log("section 3 questions", sectionThreeQuestions);
  useEffect(() => {
    if (sectionThreeData?.data && sectionThreeData.data.length > 0) {
      const initialValues: Record<string, any> = {};
      sectionThreeData.data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response;
      });
      form?.setFieldsValue(initialValues);
    }
  }, [sectionThreeData]);

  return (
    <>
      {sectionThreeData?.data?.length ? (
        sectionThreeData.data.map(
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
        <Skeleton active loading={isLoading}>
          {sectionThreeQuestions?.map(
            (item) =>
              item.subsection_name === subsectionName && (
                <div className="w-full" key={item.id}>
                  <Form.Item
                    id={item.id as unknown as string}
                    name={item.schema_name}
                    // rules={generalValidationRules}
                    label={
                      item.form_question.charAt(0).toUpperCase() +
                      item.form_question.slice(1)
                    }
                    key={item.id}
                    className="w-full"
                  >
                    {renderInput(item.input_type, item.options)}
                  </Form.Item>
                </div>
              )
          )}
        </Skeleton>
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
