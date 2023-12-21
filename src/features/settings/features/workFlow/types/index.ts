import { departmentProps } from "../../department/types";
import { employeesProps } from "../../employees/types";
import { rolesProps } from "../../rolesAndPermissions/types";

export interface workflowProps {
  id?: number;
  name: string;
  branch_id: number;
  stages: Stage[];
}

interface Stage {
  name: string;
  approver_type: string;
  employees: employeesProps[];
  departments: departmentProps[];
  roles: rolesProps[];
}
