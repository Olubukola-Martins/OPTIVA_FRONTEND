import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IdentifierProps } from "src/types";
import { generalValidationRules } from "src/utils/formHelpers/validations";
import { openNotification } from "src/utils/notification";
import { useEditProfile } from "../hooks/useEditProfile";

export const EditProfile = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useEditProfile();
  const handleSubmit = (data: any) => {
    mutate(
      { ...data, token },
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
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Edit Profile"
      style={{ top: 15 }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Full Name"
          rules={generalValidationRules}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Phone Number"
          label="phone"
          rules={generalValidationRules}
        >
          <InputNumber className="w-full" />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
