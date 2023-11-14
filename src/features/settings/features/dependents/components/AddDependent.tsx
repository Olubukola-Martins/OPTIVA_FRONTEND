import { Form, Modal, Input, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { dependentsAgeList } from "../contants";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";

export const AddDependent = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Dependents"
    >
      <Form
        layout="vertical"
        className="mt-4"
        onFinish={(val) => console.log(val)}
      >
        <Form.Item
          name="dependent"
          label="Dependent"
          rules={generalValidationRules}
        >
          <Input placeholder="Mother" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Dependent Age"
          rules={generalValidationRules}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Select"
            options={dependentsAgeList.map((item: string) => ({
              value: item,
              label: item,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="conditions"
          label="Conditions"
          rules={textInputValidationRules}
        >
          <Input placeholder="2 childless" />
        </Form.Item>

        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
