import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { Empty, Form, Skeleton } from "antd";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { AppButton } from "src/components/button/AppButton";
import { renderDetailsInput } from "./AcademicHistory";

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

export interface IApplicantDetailsProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const ApplicantBrief: React.FC<IApplicantDetailsProps> = ({
  onNext,
}) => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiononeresponse",
  });

  const [form] = Form.useForm();
  useEffect(() => {
    if (data && data.length > 0) {
      // const initialValues = {};
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response;
      });
      form.setFieldsValue(initialValues);
    }
  }, [data]);

  const { mutate, isLoading: postLoading } =
    useCreateApplicationResponse("sectiononeresponse");
  const queryClient = useQueryClient();

  const handleSubmit = (val: any) => {

    const payload = {
      application_id: id as unknown as number,
      responses:
        data?.map((item) => ({
          question_id: item.question_id,
          response: Array.isArray(val[item.question.schema_name])
            ? val[item.question.schema_name]
            : [val[item.question.schema_name]],
        })) || [],
    };
    mutate(payload, {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res.data.message,
        });
        queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
      },
    });
  };

  return (
    <>
      <Skeleton active loading={isLoading}>
        {data?.length !== 0 ? (
          <Form
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            requiredMark={false}
          >
            {data?.map((item) => (
              <Form.Item
                key={item.id}
                name={item.question.schema_name}
                label={item.question.form_question}
              >
                {renderDetailsInput(item.question.input_type, item.question.options)}
              </Form.Item>
            ))}

            <div className="flex justify-between items-center gap-5">
              <AppButton
                label="Next"
                type="button"
                handleClick={() => onNext && onNext()}
                variant="transparent"
              />
              <AppButton label="Save" type="submit" isLoading={postLoading} />
            </div>
          </Form>
        ) : (
          <Empty />
        )}
      </Skeleton>
    </>
  );
};
