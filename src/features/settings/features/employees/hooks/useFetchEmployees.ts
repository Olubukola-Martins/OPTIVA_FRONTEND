import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { employeesProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_EMPLOYEES = "departments";

const getData = async (): Promise<employeesProps[]> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/active-employees`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  
  const data: employeesProps[] = res.data.data.map(
    (item: employeesProps) => ({
      ...item,
    })
  );

  return data;
};

export const useFetchEmployees = () => {
  const queryData = useQuery([QUERY_KEY_FOR_EMPLOYEES], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
