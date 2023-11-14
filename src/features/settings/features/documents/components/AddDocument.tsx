import { Form, Modal, Input, Select, InputNumber } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { DOCUMENT_TYPES } from "src/constants/general";
import { IdentifierProps } from "src/types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "src/utils/formHelpers/validations";

export const AddDocument = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Dependents"
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        className="mt-4"
        onFinish={(val) => console.log(val)}
        requiredMark={false}
      >
        <Form.Item name="name" label="Name" rules={textInputValidationRules}>
          <Input placeholder="Document name" />
        </Form.Item>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Form.Item
            name="category"
            label="Category"
            rules={generalValidationRules}
          >
            <Select
              options={[
                {
                  label: "Family & Education",
                  value: "Family & Education",
                },
              ]}
              className="w-full"
              placeholder="Select"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="type"
            label="Document type"
            rules={generalValidationRules}
          >
            <Select
              options={[
                {
                  label: "Supporting Document",
                  value: 1,
                },
                {
                  label: "Required Document",
                  value: 2,
                },
              ]}
              className="w-full"
              placeholder="Select"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="format"
            label="Format"
            rules={generalValidationRules}
          >
            <Select options={DOCUMENT_TYPES} allowClear placeholder="Select" />
          </Form.Item>
          <Form.Item
            name="size"
            label="File size"
            rules={generalValidationRules}
          >
            <InputNumber min={1} max={20} className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          name="requirement"
          label="Requirement"
          rules={textInputValidationRules}
        >
          <Input placeholder="Document requirement" />
        </Form.Item>

        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
