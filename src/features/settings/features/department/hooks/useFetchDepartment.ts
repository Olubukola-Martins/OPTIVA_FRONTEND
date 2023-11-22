import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { departmentProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_DEPARTMENT = "departments";

const getData = async (): Promise<departmentProps[]> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/departments`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const data: departmentProps[] = res.data.data.map(
    (item: departmentProps) => ({
      ...item,
    })
  );

  return data;
};

export const useFetchDepartment = () => {
  const queryData = useQuery([QUERY_KEY_FOR_DEPARTMENT], () => getData(), {
    onError: (err: any) => {},
    onSuccess: (data) => {},
  });

  return queryData;
};
