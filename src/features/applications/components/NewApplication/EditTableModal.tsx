import  { useState } from "react";
import { Modal, Form, Input } from "antd";
import { AppButton } from "src/components/button/AppButton";

type EditTableModalProps = {
  open: boolean
  onCancel: () => void
  onSave: (data:any) => void
  title: string
  data: any
  columns:any 
}

export const EditTableModal = ({
  open,
  onCancel,
  onSave,
  title,
  data,
  columns,
}: EditTableModalProps) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prevData:any) => ({ ...prevData, [key]: value }));
  };
  // const [formData, setFormData] = useState(() => ({ ...data }));

  // const handleInputChange = (key: string, value: any) => {
  //   setFormData((prevData:any) => ({ ...prevData, [key]: value }));
  // };

  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <h2 className="text-center font-bold py-2 text-lg">{title}</h2>
      {columns.map((column:any) => (
        <div key={column.key}>
          <h2 className="py-1">{column.title}</h2>
          <Form.Item name={column.dataIndex}>
            <Input
              size="large"
              value={formData?.[column.dataIndex] || ""} 
              onChange={(e) =>
                handleInputChange(column.dataIndex, e.target.value)
              }
            />
          </Form.Item>
        </div>
      ))}
      <div className="flex justify-end">
        <div className="flex gap-5">
          <AppButton
            label="Cancel"
            variant="transparent"
            type="reset"
            handleClick={onCancel}
          />
          <AppButton label="Save" handleClick={() => onSave(formData)} />
        </div>
      </div>
    </Modal>
  );
};
