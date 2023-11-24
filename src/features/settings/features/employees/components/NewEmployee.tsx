import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { emailValidationRules, generalValidationRules } from "src/utils/formHelpers/validations";

export const NewEmployee = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="New Employee"
      style={{ top: 15 }}
    >
      <Form layout="vertical" requiredMark={false} className="mt-5">
        <Form.Item name="branch" label="Branch"  rules={generalValidationRules}>
          <Select placeholder="Select" options={[]} />
        </Form.Item>
        <Form.Item name="name" label="Employee Name"  rules={generalValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={emailValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Roles"  rules={generalValidationRules}>
          <Select placeholder="Select" options={[]} />
        </Form.Item>
        <Form.Item name="department_id" label="Department"  rules={generalValidationRules}>
          <Select placeholder="Select" options={[]} />
        </Form.Item>
       

        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
