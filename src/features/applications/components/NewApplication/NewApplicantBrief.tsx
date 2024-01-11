import {
  Checkbox,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
} from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetSingleQuestion } from "src/features/settings/features/appTemplate/hooks/useGetTemplateQuestion";
import { useCreateApplicationResponse } from "../../hooks/useCreateApplicationResponse";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "../../hooks/useGetApplication";
import { useQueryClient } from "react-query";
import { useGlobalContext } from "src/stateManagement/GlobalContext";

export const renderInput = (inputType: string, options?: any[]) => {
  if (inputType === "textarea") {
    return <Input.TextArea className="w-full" />;
  } else if (inputType === "text_input") {
    return <Input className="w-full" />;
  } else if (inputType === "select") {
    return (
      <Select className="w-1/2">
        {options?.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Select.Option>
        ))}
      </Select>
    );
  } else if (inputType === "check_box") {
    return (
      <Checkbox.Group className="w-full">
        {options?.map((option, index) => (
          <Checkbox key={index} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
  } else if (inputType === "number_input") {
    return <InputNumber className="w-1/2" />;
  } else if (inputType === "date_input") {
    return <DatePicker className="1/2" />;
  }
};

export const NewApplicantBrief = ({ onSuccess }: { onSuccess: () => void }) => {
  const { sharedData } = useGlobalContext();

  const { data, isLoading } = useGetSingleQuestion({
    id: sharedData.templateId as unknown as number,
    endpointUrl: "section-one",
  });
  const {
    mutate,
    isLoading: postLoading,
    isSuccess,
  } = useCreateApplicationResponse("sectiononeresponse");
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
        onSuccess();
      },
    });
  };

  return (
    <>
      {data?.length === 0 ? (
        <Empty />
      ) : (
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
            {!isSuccess && (
              <div className="flex justify-end items-center gap-5">
                <AppButton label="Cancel" type="reset" variant="transparent" />
                <AppButton
                  label="Save"
                  type="submit"
                  isLoading={postLoading}
                  isDisabled={isSuccess}
                  containerStyle={isSuccess ? "cursor-not-allowed" : ""}
                />
              </div>
            )}
          </Form>
        </Skeleton>
      )}
    </>
  );
};
