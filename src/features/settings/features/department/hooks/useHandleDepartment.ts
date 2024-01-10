import { useState } from "react";

export const useHandleDepartment = () => {
  const [addDepartment, setAddDepartment] = useState(false);
  const [departmentId, setDepartmentId] = useState<number>();

  const handleDepartment = (id: number) => {
    setDepartmentId(id);
    setAddDepartment(true);
  };

  const handleAddDepartment = () => {
    setDepartmentId(undefined);
    setAddDepartment(true);
  };

  return {
    addDepartment,
    setAddDepartment,
    departmentId,
    setDepartmentId,
    handleAddDepartment,
    handleDepartment,
  };
};
