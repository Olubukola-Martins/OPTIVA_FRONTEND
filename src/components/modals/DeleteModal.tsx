import { Modal } from "antd";
import { AppButton } from "../button/AppButton";
import DeleteIcon from "../../assets/delete-icon.png";

export interface IModalProps {
  header: string;
  text?: string;
  open: boolean;
  onCancel: () => void;
  onDelete?: () => void;
  onUpload?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
}
export const DeleteModal = ({
  header,
  text,
  open,
  onCancel,
  onDelete,
  isLoading,
}: IModalProps) => {
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null}>
        <div className="p-4 flex flex-col items-center gap-4">
          <img src={DeleteIcon} alt="" />

          <h2 className="font-bold text-lg">Delete {header}</h2>
          <p>Are you sure you would like to delete this {text}?</p>
          <div className="flex gap-5">
            <button
              onClick={onCancel}
              className="text-secondary  hover:text-primary transition-colors duration-300 font-medium border-2  border-secondary  rounded px-4"
            >
              Cancel
            </button>

            <AppButton
              type="button"
              label="Delete"
              handleClick={() => {
                if (onDelete) {
                  onDelete();
                }
                onCancel();
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
