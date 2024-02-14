import { Modal, Select, Form } from "antd";
import React from "react";
import { AppButton } from "src/components/button/AppButton";
import { IModalProps } from "./OutstandingDocuments";
import { generalValidationRules } from "src/utils/formHelpers/validations";

export const AssignToDAO: React.FC<IModalProps> = ({ onCancel, open }) => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <h1 className="p-4 font-bold text-center text-lg">
            Assign Applicant to DAO
          </h1>
          <Form.Item name="selectDAO" label="Select DAO" rules={generalValidationRules}>
            <Select
              options={[{ label: "Attestation", value: "attestation" }]}
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
