import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IActivityLogs } from "../types";

export const QUERY_KEY_FOR_ACTIVITY = "activityLog";

const getData = async (): Promise<IActivityLogs[]> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/dashboard/log`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);

  const data: IActivityLogs[] = res.data.data.map((item: IActivityLogs) => ({
    ...item,
  }));

  return data;
};
export const useGetActivityLog = () => {
  const queryData = useQuery([QUERY_KEY_FOR_ACTIVITY], () => getData(), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
