import { openNotification } from "src/utils/notification";
import { Form, Input } from "antd";
import { emailValidationRules } from "src/utils/formHelpers/validations";
import { AppButton } from "src/components/button/AppButton";
import { useForgotPassword } from "../hooks/useForgotPassword";

export const ForgotPasswordForm = () => {
  const { mutate, isLoading } = useForgotPassword();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    mutate(
      { ...values },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 8.0,
          });
        },
        onSuccess: (res: any) => {     
          openNotification({
            title: "Success",
            state: "success",
            description: res.data.message,
            duration: 6.0,
          });
          form.resetFields();
        },
      }
    );
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Form.Item name="email" label="Email" rules={emailValidationRules}>
        <Input />
      </Form.Item>

      <AppButton
        type="submit"
        label="Submit"
        containerStyle="w-full mt-5"
        isLoading={isLoading}
      />
    </Form>
  );
};
