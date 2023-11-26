import { END_POINT } from "src/config/environment";
import { IMilestone } from "../types";
import axios from "axios";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_MILESTONE = "milestone";

const getData = async (props: { token: string }):Promise<IMilestone[]> => {
  const url = `${END_POINT.BASE_URL}/admin/milestone`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data:IMilestone[] = res.data.data
  return data
};

export const useGetMilestone = () => {
    const { token } = useGetUserInfo();
    const queryData = useQuery(
      [QUERY_KEY_FOR_MILESTONE],
      () => getData({ token }),
      {
        onError: (err: any) => {},
        onSuccess: (data) => {},
      }
    );
    return queryData;
}
