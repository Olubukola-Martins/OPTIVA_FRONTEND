import { Empty, List } from "antd";
import {  useState } from "react";
import { useParams } from "react-router-dom";
import {
  QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  useGetSingleQuestion,
} from "../../hooks/useGetTemplateQuestion";
import { DeleteModal } from "src/components/modals/DeleteModal";
import { useDelete } from "src/hooks/useDelete";
import { showSubsectionName } from "./AboutTheApplicantTemplateDetails";
import { showInputName } from "./ApplicantBriefTemplateDetails";

export const ApplicantPeculiaritesTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading, } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-three",
  });
  
  const dataSectionThree = data;
  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-three/",
    queryKey: QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE,
  });

  const [showDeleteModalForItem, setShowDeleteModalForItem] = useState<
    number | null
  >(null);

  return (
    <>
      { dataSectionThree ?.length === 0 ? (
        <Empty description='No questions has been created for this section'/>
      ) : (
        <List itemLayout="vertical" loading={isLoading}>
          { dataSectionThree ?.map((item) => (
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
                  <p className="py-2 text-base">
                    <span className="font-medium">Sub-section:</span>{" "}
                    {showSubsectionName(item.subsection_name)}
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
