import { Form, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderInput } from "../NewApplication/NewApplicantBrief";

export const MarriageDetails: React.FC<IApplicationFormResponseProps> = ({
  onNextTabItem,
  subsectionName,
  onPrevTabItem,
}) => {
  const { id } = useParams();
  const { data,  } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });

  return (
    <>
      {data?.map(
        (item) =>
          item.subsection_name === subsectionName && (
            <Form.Item
              key={item.id}
              name={item.question.schema_name}
              label={item.question.form_question}
            >
              {renderInput(item.question.input_type, item.question.options)}
            </Form.Item>
          )
      )}

<div className="flex justify-between  my-5 py-2">
        <Tooltip title="Click to go to the previous section">
          <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onPrevTabItem && onPrevTabItem();
            }}
          ></i>
        </Tooltip>

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
