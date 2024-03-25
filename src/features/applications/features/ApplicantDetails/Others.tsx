import { Empty, Form, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { useQueryClient } from "react-query";
import { AppButton } from "src/components/button/AppButton";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useEffect } from "react";
import { IApplicantDetailsProps } from "./ApplicantBrief";
// import { renderInput } from "../NewApplication/NewApplicantBrief";
import { renderDetailsInput } from "./AcademicHistory";

export const Others: React.FC<IApplicantDetailsProps> = ({ onPrev }) => {
  const { id } = useParams();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectionfourresponse",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading: postLoading } = useCreateApplicationResponse(
    "sectionfourresponse"
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response || null;
      });
      form.setFieldsValue(initialValues);
    }
  }, [data, form]);
  

 
  const handleSubmit = (values: any) => {
    const payload = {
      application_id: Number(id),
      responses: data?.map((item) => ({
        question_id: item.id,
        response: Array.isArray(values[item.question.schema_name]) ? values[item.question.schema_name] : [values[item.question.schema_name]],
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
          <Form onFinish={handleSubmit} form={form} layout="vertical" requiredMark={false}>
           {data?.map((item) => (
              <Form.Item
                name={item.question.schema_name}
                label={item.question.form_question}
                key={item.question_id}
                className="w-full"
              >
                {renderDetailsInput(item.question.input_type, item.question.options )}
              </Form.Item>
            ))}
            <div className="flex justify-between items-center gap-5">
              <AppButton label="Prev" type="button" handleClick={onPrev} variant="transparent" />
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
