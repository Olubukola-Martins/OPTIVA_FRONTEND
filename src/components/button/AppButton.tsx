import { BeatLoader } from "react-spinners";
import { IAppBtnProps } from "src/types";

export const AppButton: React.FunctionComponent<IAppBtnProps> = ({
  containerStyle ,
  type = "button",
  isDisabled = false,
  handleClick,
  variant = "default",
  label = "Submit",
  isLoading,
  bgColor = "bg-secondary",
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={
        variant === "default"
          ? `button ${bgColor} ${containerStyle}`
          : `transparentButton ${containerStyle}`
      }
      onClick={handleClick}
    >
      {isLoading ? <BeatLoader color="#aaa" /> : label}
    </button>
  );
};
