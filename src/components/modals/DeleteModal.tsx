import { Modal } from "antd";
import { AppButton } from "../button/AppButton";
import DeleteIcon from '../../assets/delete-icon.png'

export interface IModalProps {
    header: string
    text?: string
    open: boolean
    onCancel: () => void
    onDelete?: () => void
    onUpload?: () => void
    onExport?:()=>void
}
export const DeleteModal = ({header, text, open, onCancel, onDelete}:IModalProps) => {
  return (
    <>
      <Modal open={open} onCancel={onCancel} footer={null} >
        <div className="p-3 flex flex-col items-center gap-5">
          <img src={DeleteIcon} alt="" />
                  <h2 className="font-bold text-lg">Delete { header}</h2>
                  <p>Are you sure you would like to delete this { text}?</p>
          <div className="flex gap-5">
            <AppButton
              variant="transparent"
              label="Cancel"
              handleClick={onCancel}
            />
            <AppButton type="button" label="Delete" handleClick={onDelete} />
          </div>
        </div>
      </Modal>
    </>
  );
};
