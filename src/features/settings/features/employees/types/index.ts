import { branchProps } from "../../branch/types";

export interface employeesProps {
  id: number;
  name: string;
  email: string;
  last_sent: string;
  department_id: string;
  role_id: number;
  branches: number[];
  department: {
    name: string;
  };
  user: {
    branches: branchProps[];
    roles: {
      id: number;
      name: string;
    };
  };
  created_at: string;
}
