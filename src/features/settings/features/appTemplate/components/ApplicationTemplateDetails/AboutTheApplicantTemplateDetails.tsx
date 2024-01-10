import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleQuestion } from "../../hooks/useGetSingleQuestion";
import { DeleteModal } from "src/components/modals/DeleteModal";
// import { useDelete } from "src/hooks/useDelete";
import { List, Skeleton } from "antd";

export const AboutTheApplicantTemplateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-two",
  });


  const [showDelete, setShowDelete] = useState<boolean>(false);

  // const { removeData } = useDelete({
  //   EndPointUrl: "admin/templates/section-two/",
  //   queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  // });

  return (
    <>
      <List itemLayout="vertical">
        <Skeleton active loading={isLoading}>
          {data?.map((item) => (
            <List.Item>
              <div className="flex justify-between items-center">
                <div key={item.id} className="my-3 p-2">
                  <p className="py-2 text-base">
                    Question: {item.form_question}
                  </p>
                  <p className="py-2 text-base">
                    Input type: {item.input_type}
                  </p>
                  <p className="py-2 text-base">
                    Sub-section: {item.subsection_name}
                  </p>
                </div>
                <div className="flex justify-end  w-[5%]">
                  <i
                    className="ri-delete-bin-line text-xl cursor-pointer mt-10"
                    onClick={() => setShowDelete(true)}
                  ></i>
                </div>
              </div>
            </List.Item>
          ))}
        </Skeleton>
      </List>
      <DeleteModal
        header="question"
        text="question"
        onCancel={() => setShowDelete(false)}
        open={showDelete}
        // onDelete={() => data?.forEach((item) => removeData(item.id))}
      />

     
    </>
  );
};
