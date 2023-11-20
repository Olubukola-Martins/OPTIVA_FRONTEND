import { Modal } from "antd";
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

        
    </Modal>
  );
};
