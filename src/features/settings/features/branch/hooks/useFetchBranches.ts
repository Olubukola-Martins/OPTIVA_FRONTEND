import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { branchProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_BRANCHES = "branches";

const getData = async (): Promise<branchProps[]> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/branches`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const data: branchProps[] = res.data.data.map((item: branchProps) => ({
    ...item,
  }));

  return data;
};

export const useFetchBranches = () => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_BRANCHES],
    () => getData(),
    {
      onError: (err: any) => {},
      onSuccess: (data: any) => {},
    }
  );

  return queryData;
};
