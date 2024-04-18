import { Form, Skeleton } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCreateApplicationResponse } from "../../hooks/Application hooks/useCreateApplicationResponse";
import { useGetApplicationResponse } from "../../hooks/Application hooks/useGetApplicationResponse";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/Application hooks/useGetApplication";
import { AppButton } from "src/components/button/AppButton";
import { renderDetailsInput } from "./AcademicHistory";
import { openNotification } from "src/utils/notification";
import { useQueryClient } from "react-query";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "../NewApplication/NewApplicantBrief";

export interface IApplicantDetailsProps {
  onNext?: () => void;
  onPrev?: () => void;
}

export const ApplicantBrief: React.FC<IApplicantDetailsProps> = ({
  onNext,
}) => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetApplicationResponse({
    id: id as unknown as number,
    section: "sectiononeresponse",
  });
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading: postLoading } =
    useCreateApplicationResponse("sectiononeresponse");

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const initialValues: Record<string, any> = {};
      data.data.forEach((item) => {
        initialValues[item.question.schema_name] = item.response || null;
      });
      form.setFieldsValue(initialValues);
    }
  }, [data, form]);

  const { data: sectionOneQst, isLoading: sectionOneQstLoading } =
    useGetSingleQuestion({
      id: data?.template_id as unknown as number,
      endpointUrl: "section-one",
    });

  const handleSubmit = (values: any) => {
    const payload = {
      application_id: Number(id),
      responses:
        data?.data.map((item) => ({
          question_id: item.id,
          response: Array.isArray(values[item.question.schema_name])
            ? values[item.question.schema_name]
            : [values[item.question.schema_name]],
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
      <Skeleton active loading={isLoading || sectionOneQstLoading}>
        <Form
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          {data?.data.length !== 0 ? (
            <>
              {data?.data.map((item) => (
                <>
                  <Form.Item
                    name={item.question.schema_name}
                    label={item.question.form_question}
                    key={item.question_id}
                    className="w-full"
                  >
                    {renderDetailsInput(
                      item.question.input_type,
                      item.question.options
                    )}
                  </Form.Item>
                </>
              ))}
            </>
          ) : (
            <>
              {sectionOneQst?.map((item) => (
                <Form.Item
                  name={item.schema_name}
                  label={item.form_question}
                  key={item.id}
                >
                  {renderInput(item.input_type, item.options)}
                </Form.Item>
              ))}
            </>
          )}

          <div className="flex justify-between items-center gap-5">
            <AppButton
              label="Next"
              type="button"
              handleClick={onNext}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" isLoading={postLoading} />
          </div>
        </Form>
       
      </Skeleton>
    </>
  );
};
