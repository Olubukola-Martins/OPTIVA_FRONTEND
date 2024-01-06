import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { adminDashboardCounts } from "../types";

export const QUERY_KEY_FOR_USER_PROFILE = "userProfile";

const getData = async (): Promise<adminDashboardCounts> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/get-profile`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const item: adminDashboardCounts = res.data.data;
  const data: adminDashboardCounts = {
    ...item,
  };

  return data;
};
export const useGetDashboardInfo = () => {
  const queryData = useQuery([QUERY_KEY_FOR_USER_PROFILE], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
