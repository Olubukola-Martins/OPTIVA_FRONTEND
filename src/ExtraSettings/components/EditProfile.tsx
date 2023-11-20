import { Form, Input, InputNumber, Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const EditProfile = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Edit Profile"
      style={{ top: 15 }}
    >
      <Form layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={generalValidationRules}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
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

        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
