interface IWorkflow {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  stages: Stage[];
}

interface Stage {
  id: number;
  name: string;
  workflow_id: number;
  approver_type: string;
  created_at: string;
  updated_at: string;
  roles: (Role | Role)[];
  departments: Department[][];
  employees: (Employee | Employee)[];
}

interface Employee {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  department_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot3;
  user: User;
}

interface User {
  id: number;
  name: string;
  is_super_admin: boolean;
  user_type: string;
  last_login_at?: any;
  last_login_ip?: any;
  email: string;
  email_verified_at?: any;
  is_active: boolean;
  image: string;
  created_at: string;
  updated_at: string;
}

interface Pivot3 {
  stage_id: number;
  employee_id: number;
}

interface Department {
  id: number;
  name: string;
  department_head_id: number;
  branch_id: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

interface Pivot2 {
  stage_id: number;
  department_id: number;
}

interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  stage_id: number;
  role_id: number;
}