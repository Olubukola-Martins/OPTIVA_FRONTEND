import { useState } from "react";

export interface IFilterProps {
  countryFilter?: number[];
  filterProgram?: number[];
  status?: "Under Review" | "Approved" | "Rejected";
}
export const useDashboardFilterValues = () => {
  const [filterValues, setFilterValues] = useState<IFilterProps>({
    countryFilter: [],
    filterProgram: [],
    status: undefined,
  });
  return {filterValues, setFilterValues};
};
