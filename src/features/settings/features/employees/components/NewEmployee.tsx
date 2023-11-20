import { Form, Input, Modal, Select } from "antd";
import { IdentifierProps } from "src/types";

export const NewEmployee = ({ handleClose, open }: IdentifierProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="New Department"
      style={{ top: 15 }}
    >

        <Form layout="vertical">
          <Form.Item name="branch" label="Branch">
            <Select placeholder="Select" options={[]}/>
          </Form.Item>
          <Form.Item name="name" label="Employee Name">
            <Input />
          </Form.Item>
        </Form>
    </Modal>
  );
};
