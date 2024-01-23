import { Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { AppButton } from "src/components/button/AppButton";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";
import { renderPTag } from "./ApplicantBrief";

export const PEP: React.FC<IApplicationFormResponseProps> = ({
  onNext,
  subsectionName,
}) => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiontworesponse",
  });

  return (
    <Skeleton active loading={isLoading}>
      {data?.map(
        (item) =>
          item.question.subsection_name === subsectionName && (
            <div className="mt-2 py-2" key={item.id}>
              <h2 className="py-3">{item.question.form_question}</h2>
              {renderPTag(item.question.input_type, item.response)}
            </div>
          )
      )}
      <AppButton
        label="Next"
        type="button"
        handleClick={() => {
          onNext();
        }}
      />
    </Skeleton>
  );
};
