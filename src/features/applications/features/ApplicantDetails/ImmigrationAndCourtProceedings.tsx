import { Empty, Form, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderDetailsInput } from "./AcademicHistory";

export const ImmigrationAndCourtProceedings: React.FC<
  IApplicationFormResponseProps
> = ({ onNextTabItem, subsectionName }) => {
  const { id } = useParams();
  const { data } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectionthreeresponse",
  });

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
