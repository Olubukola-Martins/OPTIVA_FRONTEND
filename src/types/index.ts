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

export interface SidebarLink {
  to: string;
  title: string;
  icon: string;
}

export interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface IdentifierProps {
  id?: number;
  open: boolean;
  handleClose: Function;
}

export interface IUserToken {
  token: string;
}

export interface IGeneralProps {
  id: number;
  EndPointUrl?: string;
  is_active?: boolean;
}

export interface paginationAndFilterProps {
  pagination?: {
    pageSize?: number;
    current?: number;
  };
  search?: string;
  currentUrl?: string;
}
