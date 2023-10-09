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
  
  export interface pageIntroProps {
    title: string;
    description?: string;
    linkBack?: string;
    arrowBack?: boolean;
  }
  
  export interface simpleCardProps {
    title: string;
    count: number;
    cardColor: "blue" | "green" | "yellow" | "oxblood";
    icon: string;
  }