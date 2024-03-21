import { Empty, Form, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import "../../assets/style.css";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderDetailsInput } from "./AcademicHistory";

export const PersonalDetails: React.FC<IApplicationFormResponseProps> = ({
  subsectionName,
  onNextTabItem,
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
