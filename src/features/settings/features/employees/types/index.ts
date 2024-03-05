import { branchProps } from "../../branch/types";

// export interface employeesProps {
//   id: number;
//   name: string;
//   email: string;
//   last_sent: string;
//   department_id: string;
//   role_id: number;
//   branches: number[];
//   department: {
//     name: string;
//   };
//   user: {
//     role_id: number | undefined;
//     branches: branchProps[];
//     roles: {
//       id: number;
//       name: string;
//     };
//   };
//   created_at: string;
// }
export interface employeesProps {
  id: number;
  name: string;
  email: string;
  department_id?: any;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  department?: any;
}

interface User {
  id: number;
  name: string;
  current_branch_id: number;
  is_super_admin: boolean;
  user_type: string;
  last_login_at: string;
  last_login_ip: string;
  email: string;
  email_verified_at?: any;
  phone?: any;
  employee_id: number;
  role_id: number;
  intl_id?: any;
  applicant_id?: any;
  is_active: boolean;
  image: string;
  created_at?: any;
  updated_at: string;
  roles: Roles;
  branches: branchProps[];
}

// interface Branch {
//   id: number;
//   name: string;
//   is_active: number;
//   email?: string;
//   address_details?: string;
//   is_deletable: boolean;
//   created_at: string;
//   updated_at: string;
//   pivot: Pivot;
// }

// interface Pivot {
//   user_id: number;
//   branch_id: number;
// }

interface Roles {
  id: number;
  name: string;
  is_deletable: boolean;
  created_at: string;
  updated_at: string;
}
