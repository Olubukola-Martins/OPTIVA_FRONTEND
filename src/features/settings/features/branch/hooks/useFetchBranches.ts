import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { branchProps } from "../types";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

export const QUERY_KEY_FOR_BRANCHES = "branches";

const getData = async (props: { token: string }): Promise<branchProps[]> => {
  const url = `${END_POINT.BASE_URL}/admin/branches`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const res = await axios.get(url, config);
  const data: branchProps[] = res.data.data.map((item: branchProps) => ({
    ...item,
  }));

  return data;
};

export const useFetchBranches = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_BRANCHES],
    () => getData({ token }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
