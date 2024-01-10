import {List,  Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleQuestion } from "../../hooks/useGetSingleQuestion";
import { useState } from "react";
import { useDelete } from "src/hooks/useDelete";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "../../hooks/useGetApplicationTemplate";
import { DeleteModal } from "src/components/modals/DeleteModal";

export const ApplicantBriefTemplateDetails = () => {
  const { id } = useParams();
  const { data,} = useGetSingleQuestion({
    id: id as unknown as number,
    endpointUrl: "section-one",
  });
  const { removeData } = useDelete({
    EndPointUrl: "admin/templates/section-one/",
    queryKey: QUERY_KEY_FOR_APPLICATION_TEMPLATE,
  });

  const [showDelete, setShowDelete] = useState<boolean>(false);


  return (
    <>
      <div>
        {data?.map((item) => (
          <p>{item.form_question}</p>
        ))}
      </div>
      <List itemLayout="vertical" className="hidden">
        <Skeleton active loading={false}>
          {data?.map((item,) => (
            <List.Item>
              <div className="flex justify-between items-center">
                <div key={item.id} className="my-3 p-2">
                  <p className="py-2 text-base">
                    Question: {item.form_question}
                  </p>
                  <p className="py-2 text-base">
                    Input type: {item.input_type}
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
        onDelete={() => data?.forEach((item) => removeData(item.id))}
      />
    </>
  );
};
