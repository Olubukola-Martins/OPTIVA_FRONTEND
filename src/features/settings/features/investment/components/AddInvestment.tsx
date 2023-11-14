import { Modal, Input, Form } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { IdentifierProps } from "src/types";
import { textInputValidationRules } from "src/utils/formHelpers/validations";

export const AddInvestment = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Investment Route"
    >
      <Form
        layout="vertical"
        className="mt-4"
        onFinish={(val) => console.log(val)}
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Investment Name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Enter..." />
        </Form.Item>

        <AppButton type="submit" />
      </Form>
    </Modal>
  );
};
