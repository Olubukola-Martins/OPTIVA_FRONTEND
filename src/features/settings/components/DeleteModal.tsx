import { Modal } from "antd";
import { AppButton } from "src/components/button/AppButton";

interface IProps {
  description?: string;
  heading?: string;
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}
const DeleteModal = ({
  open,
  handleClose,
  heading,
  description,
  handleDelete,
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
              backgroundColor: "rgba(255, 149, 0, 0.2)",
              border: "7px solid rgba(255, 149, 0, 0.05)",
              width: "62px",
              height: "62px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <g clip-path="url(#clip0_3613_17643)">
                <path
                  d="M14.5958 2.5451C14.4349 2.26489 14.203 2.03209 13.9233 1.87019C13.6437 1.7083 13.3264 1.62305 13.0033 1.62305C12.6802 1.62305 12.3628 1.7083 12.0832 1.87019C11.8036 2.03209 11.5716 2.26489 11.4108 2.5451L0.268129 21.504C-0.474496 22.7682 0.416004 24.3753 1.86063 24.3753H24.1443C25.5889 24.3753 26.481 22.7666 25.7368 21.504L14.5958 2.5451ZM13 8.12535C13.8694 8.12535 14.5503 8.8761 14.4625 9.74222L13.8938 15.4411C13.8746 15.665 13.7722 15.8735 13.6067 16.0255C13.4412 16.1775 13.2247 16.2618 13 16.2618C12.7753 16.2618 12.5588 16.1775 12.3933 16.0255C12.2278 15.8735 12.1254 15.665 12.1063 15.4411L11.5375 9.74222C11.5171 9.53785 11.5397 9.33147 11.6039 9.13637C11.6681 8.94127 11.7724 8.76178 11.9102 8.60946C12.048 8.45713 12.2161 8.33536 12.4038 8.25198C12.5915 8.1686 12.7946 8.12547 13 8.12535ZM13.0033 17.8753C13.4342 17.8753 13.8476 18.0466 14.1523 18.3513C14.457 18.656 14.6283 19.0694 14.6283 19.5003C14.6283 19.9313 14.457 20.3447 14.1523 20.6494C13.8476 20.9541 13.4342 21.1253 13.0033 21.1253C12.5723 21.1253 12.159 20.9541 11.8542 20.6494C11.5495 20.3447 11.3783 19.9313 11.3783 19.5003C11.3783 19.0694 11.5495 18.656 11.8542 18.3513C12.159 18.0466 12.5723 17.8753 13.0033 17.8753Z"
                  fill="#FF9500"
                />
              </g>
              <defs>
                <clipPath id="clip0_3613_17643">
                  <rect width="26" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-center text-lg mb-[10px] font-semibold">
            {heading}
          </h4>
          <p className="text-center text-base ">{description}</p>
        </div>
        <div className="flex justify-between w-fit gap-4 mb-3">
          <AppButton
            label="Cancel"
            variant="transparent"
            handleClick={() => handleClose()}
          />
          <AppButton
            label="Delete"
            handleClick={() => {
              handleDelete();
              handleClose();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
