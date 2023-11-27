import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { employeesProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_EMPLOYEES = "departments";

const getData = async (endpoint: string): Promise<employeesProps[]> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/${endpoint}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
console.log(res);

  const data: employeesProps[] = res.data.data.map((item: employeesProps) => ({
    ...item,
  }));

  return data;
};

export const useFetchEmployees = (endpoint: string) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_EMPLOYEES, endpoint],
    () => getData(endpoint),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
