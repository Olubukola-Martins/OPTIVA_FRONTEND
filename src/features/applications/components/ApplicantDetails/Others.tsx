import { Empty, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { renderPTag } from "./ApplicantBrief";

export const Others = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectionfourresponse",
  });

  return (
    <>
      <Skeleton active loading={isLoading}>
        {data?.length !== 0 ? (
          data?.map((item) => (
            <div className="mt-2 py-2" key={item.id}>
              <h2 className="py-3">
                {item.question.form_question.charAt(0).toUpperCase() +
                  item.question.form_question.slice(1)}
              </h2>
              {renderPTag(item.question.input_type, item.response)}
            </div>
          ))
        ) : (
          <Empty />
        )}
      </Skeleton>
    </>
  );
};
