import { Form, Input, Modal } from "antd";
import { IdentifierProps } from "src/types";
import {
  generalValidationRules,
  passwordValidationRules,
} from "src/utils/formHelpers/validations";
import { useChangePassword } from "../hooks/useChangePassword";
import { AppButton } from "src/components/button/AppButton";
import { openNotification } from "src/utils/notification";

export const ChangePassword = ({ handleClose, open }: IdentifierProps) => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useChangePassword();

  const handleSubmit = (data: any) => {
    mutate(
      { ...data },
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
      title="Change Password"
      style={{ top: 15 }}
    >
      <Form
        layout="vertical"
        className="mt-7"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="old"
          label="Old Password"
          rules={generalValidationRules}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password"
          label="New Password"
          rules={passwordValidationRules}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered does not match."
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
