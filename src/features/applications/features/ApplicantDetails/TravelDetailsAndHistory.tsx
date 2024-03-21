import { Empty, Form, Tooltip } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { renderDetailsInput } from "./AcademicHistory";

export interface IDataResponseProps {
  subsectionName: string;
  onPrev?: () => void;
}
export const TravelDetailsAndHistory: React.FC<IDataResponseProps> = ({
  subsectionName,
  onPrev,
}) => {
  const { id } = useParams();
  const { data } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });

  return (
    <>
      {data?.length ? (
        data.map(
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
        )
      ) : (
        <Empty />
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
