import { Empty, Form, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import "../../assets/style.css";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderDetailsInput } from "./AcademicHistory";
import { useGetSectionResponse } from "../../hooks/Application hooks/useGetSectionResponse";

export const PersonalDetails: React.FC<IApplicationFormResponseProps> = ({
  subsectionName,
  onNextTabItem,
}) => {
  const { id } = useParams();
  const { data } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });
  const { data:sectionTwoData}=useGetSectionResponse({
    subsection_name: subsectionName,
    currentUrl: `${id as unknown as number}/sectiontworesponse`,
  });
  console.log('subsection name', subsectionName)

  console.log('new section 2', sectionTwoData)
  return (
    <>
      {data?.length ? (
        data.map(
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
                  // item.section_one_response,
                  // (value) => handleSelectChange(item.form_question, value)
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
