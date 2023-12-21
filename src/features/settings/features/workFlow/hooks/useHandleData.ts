import { useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import { useFetchEmployees } from "../../employees/hooks/useFetchEmployees";
import { useFetchDepartment } from "../../department/hooks/useFetchDepartment";
import { useFetchRoles } from "../../rolesAndPermissions/hooks/useFetchRoles";

export const useHandleData = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm);

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isSuccess: rolesSuccess,
  } = useFetchRoles({
    search: debouncedSearchTerm,
  });

  const {
    data: employeeData,
    isLoading: isLoadingEmployees,
    isSuccess: employeesSuccess,
  } = useFetchEmployees({
    currentUrl: "active-employees",
    search: debouncedSearchTerm,
  });

  const {
    data: departData,
    isLoading: isLoadingDepart,
    isSuccess: departSuccess,
  } = useFetchDepartment({
    currentUrl: "active-departments",
    search: debouncedSearchTerm,
  });

  const handleSearch = (val: string) => {
    setSearchTerm(val);
  };
  return {
    handleSearch,
    setSearchTerm,
    employeeData,
    isLoadingEmployees,
    employeesSuccess,
    departData,
    departSuccess,
    isLoadingDepart,
    rolesData,
    isLoadingRoles,
    rolesSuccess,
  };
};
