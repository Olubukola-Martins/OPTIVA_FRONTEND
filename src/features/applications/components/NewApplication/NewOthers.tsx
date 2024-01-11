import { Form, Skeleton } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { renderInput } from "./NewApplicantBrief";
import { useCreateApplicationResponse } from "../../hooks/useCreateApplicationResponse";
import { useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { useGlobalContext } from "src/stateManagement/GlobalContext";

export const NewOthers = () => {
  const { sharedData } = useGlobalContext();
  const { data, isLoading } = useGetSingleQuestion({
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-four",
  });


  const { mutate, isLoading: postLoading } = useCreateApplicationResponse(
    "sectionfourresponse"
  );
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const handleSubmit = (val: any) => {
    const applicationId = sharedData.applicantId as unknown as number;

    const payload = {
      application_id: applicationId,
      responses:
        data?.map((item) => ({
          question_id: item.id,
          response: Array.isArray(val[item.schema_name])
            ? val[item.schema_name]
            : [val[item.schema_name]],
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
        <Form onFinish={handleSubmit} form={form} layout="vertical">
          {data?.map((item) => (
            <div className="w-full">
              <Form.Item
                name={item.schema_name}
                label={
                  item.form_question.charAt(0).toUpperCase() +
                  item.form_question.slice(1)
                }
                key={item.id}
                className="w-full"
              >
                {renderInput(item.input_type, item.options)}
              </Form.Item>
            </div>
          ))}
          <div className="flex justify-end items-center gap-5">
            <AppButton label="Cancel" type="reset" variant="transparent" />
            <AppButton label="Save" type="submit" isLoading={postLoading} />
          </div>
        </Form>
      </Skeleton>
    </>
  );
};
