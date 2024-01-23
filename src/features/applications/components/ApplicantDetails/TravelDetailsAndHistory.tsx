import { Empty, Skeleton } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { renderPTag } from "./ApplicantBrief";

export interface IDataResponseProps {
  subsectionName: string;
  onPrev? : ()=>void
}
export const TravelDetailsAndHistory: React.FC<IDataResponseProps> = ({
  subsectionName,
}) => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });

  return (
    <Skeleton active loading={isLoading}>
      {data?.length !== 0 ? (
        data?.map(
          (item) =>
            item.question.subsection_name === subsectionName && (
              <div className="mt-2 py-2" key={item.id}>
                <h2 className="py-3">
                  {item.question.form_question.charAt(0).toUpperCase() +
                    item.question.form_question.slice(1)}
                </h2>
                {renderPTag(item.question.input_type, item.response)}
              </div>
            )
        )
      ) : (
        <Empty />
      )}
    </Skeleton>
  );
};
