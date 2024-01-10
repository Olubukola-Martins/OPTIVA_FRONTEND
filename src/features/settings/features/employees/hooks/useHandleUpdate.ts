import { useState } from "react";

export const useHandleUpdate = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState<number>();

  const handleEmployee = (id: number) => {
    setEmployeeId(id);
    setAddEmployee(true);    
  };

  const handleAddEmployee = () => {
    setEmployeeId(undefined);
    setAddEmployee(true);
  };
  return {
    addEmployee,
    setAddEmployee,
    employeeId,
    handleAddEmployee,
    handleEmployee,
  };
};
