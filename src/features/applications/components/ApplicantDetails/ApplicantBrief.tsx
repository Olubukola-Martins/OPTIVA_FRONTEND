import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { Skeleton } from "antd";

export const renderPTag = (input_type: string, text: any) => {
  const formattedText = text ? text.join(", ") : text;
  if (
    input_type === "checkbox" ||
    "text_input" ||
    "select" ||
    "number_input" ||
    "date_input"
  ) {
    return <p className="applicantDetailsSinglePTag">{formattedText}</p>;
  } else if (input_type === "textarea") {
    return (
      <p className="applicantDetailsDiv h-24 border rounded-md">
        {formattedText}
      </p>
    );
  }
};

export const ApplicantBrief = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiononeresponse",
  });

  return (
    <>
      <Skeleton active loading={isLoading}>
        {data?.map((item) => (
          <div className="mt-2 py-2" key={item.id}>
            <h2 className="py-3">
              {item.question.form_question.charAt(0).toUpperCase() +
                item.question.form_question.slice(1)}
            </h2>
            {renderPTag(item.question.input_type, item.response)}
          </div>
        ))}
      </Skeleton>
    </>
  );
};
