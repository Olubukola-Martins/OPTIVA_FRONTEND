import { Form, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { IDataResponseProps } from "./TravelDetailsAndHistory";
import { renderDetailsInput } from "./AcademicHistory";

export const CriminalHistory: React.FC<IDataResponseProps> = ({
  subsectionName,
  onPrev,
}) => {
  const { id } = useParams();
  const { data } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectionthreeresponse",
  });

  return (
    <>
      {data?.map(
        (item) =>
          item.subsection_name === subsectionName && (
            <Form.Item
            name={item.schema_name}
            label={item.form_question}
            key={item.id}
            className="w-full"
          >
            {renderDetailsInput(
              item.input_type,
              // item.question.options
            )}
          </Form.Item>
          )
      )}

      <div className="flex justify-between  my-5 py-2">
        <Tooltip title="Click to go to the previous section">
          <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onPrev && onPrev();
            }}
          ></i>
        </Tooltip>
      </div>
    </>
  );
};
