import { Empty, Skeleton, Tooltip } from "antd";
import { renderPTag } from "./ApplicantBrief";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { IApplicationFormResponseProps } from "../NewApplication/NewImmigrationAndCourtProceedings";

export const AcademicHistory: React.FC<IApplicationFormResponseProps> = ({
  onNextTabItem,
  subsectionName,
  onPrevTabItem,
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

      <div className="flex justify-between  my-5 py-2">
        <Tooltip title="Click to go to the previous section">
          <i
            className="ri-arrow-left-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onPrevTabItem && onPrevTabItem();
            }}
          ></i>
        </Tooltip>

        <Tooltip title="Click to go to the next section">
          <i
            className="ri-arrow-right-s-line cursor-pointer text-2xl font-semibold"
            onClick={() => {
              onNextTabItem && onNextTabItem();
            }}
          ></i>
        </Tooltip>
      </div>
    </Skeleton>
  );
};
