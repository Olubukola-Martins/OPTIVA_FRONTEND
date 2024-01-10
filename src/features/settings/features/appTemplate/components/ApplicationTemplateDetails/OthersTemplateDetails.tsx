import { Empty, List } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  useGetSingleQuestion,
} from "../../hooks/useGetTemplateQuestion";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";
import { showInputName } from "./ApplicantBriefTemplateDetails";

export const OthersTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-four",
  });

  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-four/",
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
