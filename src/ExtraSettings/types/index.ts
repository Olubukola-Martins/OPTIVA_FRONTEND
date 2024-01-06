
export interface changePasswordProps {
  old: string;
  password: string;
  password_confirmation: string;
}

export interface editProfileProps {
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
  roles: {
    id: number;
    name: string;
  }
}