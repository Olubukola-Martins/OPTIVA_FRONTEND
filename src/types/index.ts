export type IAppBtnProps = {
    isLoading?: boolean;
    label?: string;
    type?: "submit" | "reset" | "button";
    handleClick?: () => void;
    containerStyle?: string;
    isDisabled?: boolean;
    variant?: "default" | "transparent";
    bgColor?: string;
  };
  