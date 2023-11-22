import { IUserToken } from "src/types";

export interface changePasswordProps extends IUserToken {
  old: string;
  password: string;
  password_confirmation: string;
}

export interface editProfileProps extends IUserToken {
  name: string;
  phone: string;
}


export interface userProfileProps {
  id: number;
  name: string;
  current_branch_id?: any;
  is_super_admin: boolean;
  user_type: string;
  email: string;
  phone?: string;
  employee_id?: any;
  intl_id?: any;
  applicant_id?: any;
  image: string;
}