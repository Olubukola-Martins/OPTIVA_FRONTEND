import { Empty, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderPTag } from "./ApplicantBrief";

export const PEP: React.FC<IApplicationFormResponseProps> = ({
  onNext,
  subsectionName,
  onPrev,
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
                <h2 className="py-3">{item.question.form_question}</h2>
                {renderPTag(item.question.input_type, item.response)}{" "}
                <div className="flex justify-between  my-5 py-2">
                  <i
                    className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
                    onClick={() => {
                      onPrev && onPrev();
                    }}
                  ></i>
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
          <div className="flex justify-between  my-5 py-2">
                  <i
                    className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
                    onClick={() => {
                      onPrev && onPrev();
                    }}
                  ></i>
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
