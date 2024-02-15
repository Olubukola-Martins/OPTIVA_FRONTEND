import { Form, Modal, Select } from "antd";
import { AppButton } from "src/components/button/AppButton";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export interface IModalProps {
  open: boolean;
  onCancel: () => void;
}

export const OutstandingDocuments: React.FC<IModalProps> = ({
  onCancel,
  open,
}) => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <h1 className="p-4 font-bold text-center text-lg">
            Select Outstanding Document
          </h1>
          <Form.Item name="outstandingDoc" label='Select Document(s)' rules={generalValidationRules}>
            <Select
              options={[{ label: "Attestation", value: "attestation" }]}
              mode="multiple"
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-5">
            <AppButton
              label="Cancel"
              type="reset"
              // handleClick={() => handleClose()}
              variant="transparent"
            />
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </Modal>
    </>
  );
};
