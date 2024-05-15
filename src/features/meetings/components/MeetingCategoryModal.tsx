import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { AppButton } from "src/components/button/AppButton";
import { textInputValidationRules } from "src/utils/formHelpers/validations";

interface IProps {
  newCategory: boolean;
  handleShowModal: (val: boolean) => void;
}

const MeetingCategoryModal = ({ newCategory, handleShowModal }: IProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalForm] = useForm();
  
    return (
      
    <Modal
      open={showModal}
      title={`${
        newCategory ? "Add Meeting Category" : "Edit Meeting Category"
      }`}
      footer={null}
      onCancel={() => {
        setShowModal(false);
      }}
    >
      <Form layout="vertical" onFinish={() => {}} form={modalForm}>
        <Form.Item label={"Category Name"} rules={textInputValidationRules}>
          <Input></Input>
        </Form.Item>
        <Form.Item label={"Description"}>
          <TextArea></TextArea>
        </Form.Item>
        <div className="flex justify-center mx-auto gap-4 mt-10 mb-3">
          <AppButton variant="transparent" label="Cancel" />
          <AppButton label="Save" />
        </div>
      </Form>
    </Modal>
  );
};

export default MeetingCategoryModal;
