import { Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";

interface IProps {
  description?: string;
  open: boolean;
  handleClose: () => void;
  buttonLabel?: string
}
const SuccessModal = ({
  open,
  handleClose,
  description,
  buttonLabel
}: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
      closeIcon={false}
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-center  items-center">
          <div
            style={{
              borderRadius: "999px",
              backgroundColor: "rgba(40, 167, 69, 0.40)",
              border: "7px solid rgba(40, 167, 69, 0.20)",
              width: "62px",
              height: "62px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 6.99984L9 18.9998L3.5 13.4998L4.91 12.0898L9 16.1698L19.59 5.58984L21 6.99984Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <h4 className="text-center text-2xl w-4/5 mx-auto mb-4 font-semibold">
          {description}
        </h4>
        <div className="flex justify-center w-fit gap-4 mb-3">
          <AppButton label={`${buttonLabel ? buttonLabel : "Ok"}`} handleClick={() => handleClose()} />
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
