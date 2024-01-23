import { Empty, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import "../../assets/style.css";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { renderPTag } from "./ApplicantBrief";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";

export const PersonalDetails: React.FC<IApplicationFormResponseProps> = ({
  subsectionName,
  onNext,
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

                <div className="flex justify-between  my-5 py-2">
                  <i
                    className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
                    onClick={() => {
                      onNext && onNext();
                    }}
                  ></i>
                </div>
              </div>
            )
        )
      ) : (
        <>
          <Empty />
          <div className="flex justify-between my-5 py-2">
            <i
              className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
              onClick={() => {
                onNext && onNext();
              }}
            ></i>
          </div>
        </>
      )}
    </Skeleton>
  );
};
