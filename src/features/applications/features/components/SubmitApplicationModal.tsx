import { Checkbox, Form, Modal } from "antd";
import React, { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { UploadModal } from "src/components/modals/UploadModal";
import { generalValidationRulesOpt } from "src/utils/formHelpers/validations";

interface ISubmitProps {
  open: boolean;
  handleClose: () => void;
  handleOpenImportModal: () => void;
}

export const SubmitApplicationModal: React.FC<ISubmitProps> = ({
  open,
  handleClose,
  handleOpenImportModal,
}) => {
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleSubmit = (val: any) => {
    console.log("form values", val);
    setFormSubmitted(true);
  };

  return (
    <>
      <Modal footer={null} open={open} onCancel={handleClose}>
        <Form form={form} onFinish={handleSubmit}>
          <h1 className="p-2 font-bold text-center text-lg">
            Choose an Option
          </h1>
          <Form.Item
            className="border p-2 rounded-md"
            rules={generalValidationRulesOpt}
          >
            <Checkbox>Prospect is ready to pay full threshold payment</Checkbox>
          </Form.Item>
          <Form.Item
            className="border p-2 rounded-md"
            rules={generalValidationRulesOpt}
          >
            <Checkbox>
              Prospect is ready to pay 0% or less than the threshold payment
            </Checkbox>
          </Form.Item>

          <div className="flex items-center justify-center gap-4 p-4 mt-2">
            <AppButton
              label="Cancel"
              variant="transparent"
              containerStyle="border border-secondary text-secondary"
              type="reset"
            />
            <AppButton
              label="Next"
              type="submit"
              handleClick={() => handleOpenImportModal()}
            />
          </div>
        </Form>

        {formSubmitted && (
          <UploadModal
            header="Proof of Payment"
            open={true}
            onCancel={() => setFormSubmitted(false)}
          />
        )}
      </Modal>
    </>
  );
};
