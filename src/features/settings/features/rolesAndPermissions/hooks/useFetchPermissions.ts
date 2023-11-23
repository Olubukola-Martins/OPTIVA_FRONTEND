import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { permissionsProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_PERMISSIONS = "permissions";

const getData = async (): Promise<permissionsProps[]> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/permissions`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const data: permissionsProps[] = res.data.data.map((item: permissionsProps) => ({
    ...item,
  }));

  return data;
};

export const useFetchPermissions = () => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_PERMISSIONS],
    () => getData(),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
