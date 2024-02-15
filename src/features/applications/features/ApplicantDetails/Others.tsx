import { Form, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { useGetApplicationResponse } from "../../hooks/useGetApplicationResponse";
import { useQueryClient } from "react-query";
import { AppButton } from "src/components/button/AppButton";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { renderInput } from "../NewApplication/NewApplicantBrief";
import { useCreateApplicationResponse } from "../../hooks/useCreateApplicationResponse";
import { useEffect } from "react";

export const Others = () => {
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
      // const initialValues = {};
      const initialValues: Record<string, any> = {};
      data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response;
      });
      form.setFieldsValue(initialValues);
    }
  }, [data]);

  const handleSubmit = (val: any) => {
    const payload = {
      application_id: id as unknown as number,
      responses:
        data?.map((item) => ({
          question_id: item.id,
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
              {renderInput(item.question.input_type, item.question.options)}
            </Form.Item>
          ))}

          <div className="flex justify-end items-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              variant="transparent"
              // isDisabled={isSuccess}
            />
            <AppButton
              label="Save"
              type="submit"
              isLoading={postLoading}
              // isDisabled={isSuccess}
            />
          </div>
        </Form>
      </Skeleton>
    </>
  );
};
