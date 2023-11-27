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
}