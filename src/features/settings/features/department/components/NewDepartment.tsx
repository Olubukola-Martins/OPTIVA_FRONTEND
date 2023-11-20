import { Form, Input, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import {
  generalValidationRules,
  textInputValidationRulesOpt,
} from "src/utils/formHelpers/validations";

export const NewDepartment = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="New Department"
      style={{ top: 15 }}
    >
      <Form layout="vertical" requiredMark="optional">
        <Form.Item name={"name"} label="Name" rules={generalValidationRules}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"departmentID"}
          label="Department ID"
          rules={textInputValidationRulesOpt}
        >
          <Input />
        </Form.Item>
        <Form.Item name="branch" label="Branch">
          <Select options={[{ value: 1, label: "Lagos" }]} />
        </Form.Item>
        <Form.Item name="head" label="Department head">
          <Select options={[{ value: 1, label: "Basil Ikpe" }]} />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={textInputValidationRulesOpt}
        >
          <Input />
        </Form.Item>
        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
