import { branchProps } from "../../branch/types";
import { rolesProps } from "../../rolesAndPermissions/types";

export interface employeesProps {
  id: number;
  name: string;
  email: string;
  last_sent: string;
  department_id: string;
  roles: number[];
  branches: number[];
  department: {
    name: string;
  };
  user: {
    branches: branchProps[];
    roles: rolesProps[];
  };
  created_at: string;
}
