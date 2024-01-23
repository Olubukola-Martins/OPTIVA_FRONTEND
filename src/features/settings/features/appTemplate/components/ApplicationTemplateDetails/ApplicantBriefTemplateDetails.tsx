import { Empty, List } from "antd";
import { useParams } from "react-router-dom";
import {
  QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  useGetSingleQuestion,
} from "../../hooks/useGetTemplateQuestion";
import { useState } from "react";
import { useDelete } from "src/hooks/useDelete";
import { DeleteModal } from "src/components/modals/DeleteModal";

export const showInputName = (inputType: string) => {
  if (inputType === "text_input") {
    return "Text Input";
  } else if (inputType === "select") {
    return "Select";
  } else if (inputType === "check_box") {
    return "Checkbox";
  } else if (inputType === "textarea") {
    return "Text Area";
  } else if (inputType === "number_input") {
    return "Number Input";
  } else if (inputType === "date_input") {
    return "Date Picker";
  }
};

export const ApplicantBriefTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-one",
  });
  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-one/",
    queryKey: QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  });

  const [showDeleteModalForItem, setShowDeleteModalForItem] = useState<
    number | null
    >(null);
  

  return (
    <>
      {data?.length === 0 ? (
        <Empty description='No questions has been created for this section'/>
      ) : (
        <List itemLayout="vertical" loading={isLoading}>
          {data?.map((item) => (
            <List.Item key={item.id}>
              <div className="flex justify-between items-center">
                <div className="my-3 p-2">
                  <p className="py-2 text-base">
                    <span className="font-medium">Question:</span>{" "}
                    {item.form_question.charAt(0).toUpperCase() +
                      item.form_question.slice(1)}
                    {/* {item.form_question} */}
                  </p>
                  <p className="py-2 text-base">
                    <span className="font-medium">Input type:</span>{" "}
                    {showInputName(item.input_type)}
                  </p>
                </div>
                <div className="flex justify-end  w-[5%]">
                  <i
                    className="ri-delete-bin-line text-xl cursor-pointer mt-10"
                    onClick={() => setShowDeleteModalForItem(item.id)}
                  ></i>
                </div>
              </div>
              {showDeleteModalForItem === item.id && (
                <DeleteModal
                  header="question"
                  text="question"
                  onCancel={() => setShowDeleteModalForItem(null)}
                  open={showDeleteModalForItem !== null}
                  onDelete={() => removeData(item.id)}
                />
              )}
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
};
