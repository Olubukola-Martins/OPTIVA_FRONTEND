import { Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";

interface IModalProps {
  open: boolean;
  onCancel: (data: any) => void;
}
export const ApplicationAssignmentModal: React.FC<IModalProps> = ({
  open,
  onCancel,
}) => {
  return (
    <>
      <Modal footer={null} open={open} onCancel={onCancel}>
        <h2 className="font-bold text-lg my-3">Application Assignment</h2>
        <p className="my-2 text-base font-medium">Easily track the assignment of applications</p>
        <div className="flex justify-between my-2 p-2">
          <div>Ruth Godwin</div>
          <div>Service Manager</div>
          <AppButton label={"Ongoing"} type="button" variant="transparent"/>
        </div>
      </Modal>
    </>
  );
};
