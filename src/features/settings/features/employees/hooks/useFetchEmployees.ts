import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { employeesProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";
import { paginationAndFilterProps } from "src/types";

export const QUERY_KEY_FOR_EMPLOYEES = "employees";

const getData = async (
  props: paginationAndFilterProps
): Promise<{ data: employeesProps[]; total: number }> => {
  const { pagination, search, currentUrl } = props;
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/${currentUrl}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: search,
      page: pagination?.current,
      limit: pagination?.pageSize,
    },
  };
  const res = await axios.get(url, config);
console.log(res);

  const data: employeesProps[] = res.data.data.map((item: employeesProps) => ({
    ...item,
  }));

  const ans = {
    data,
    total: res.data.meta.total,
  };

  return ans;
};

export const useFetchEmployees = ({
  pagination,
  search,
  currentUrl,
}: paginationAndFilterProps = {}) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_EMPLOYEES, pagination, search, currentUrl],
    () => getData({ pagination, search, currentUrl }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
