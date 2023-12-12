export interface workflowProps {
  id?: number;
  name: string;
  branch_id: number;
  stages: Stage[];
}

interface Stage {
  name: string;
  approver_type: string;
  employees: number[];
  departments: number[];
  roles: number[];
}
