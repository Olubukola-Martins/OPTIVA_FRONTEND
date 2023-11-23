import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { rolesProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_ROLES = "roles";

const getData = async (): Promise<rolesProps[]> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/roles`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const data: rolesProps[] = res.data.data.map(
    (item: rolesProps) => ({
      ...item,
    })
  );

  return data;
};

export const useFetchRoles = () => {
  const queryData = useQuery([QUERY_KEY_FOR_ROLES], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
