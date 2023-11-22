import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { userProfileProps } from "../types";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

export const QUERY_KEY_FOR_USER_PROFILE = "userProfile";

const getData = async (props: {
  token: string;
}): Promise<userProfileProps> => {
  const url = `${END_POINT.BASE_URL}/get-profile`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const res = await axios.get(url, config);
  const item: userProfileProps = res.data.data;
  const data: userProfileProps = {
    ...item,
  };

  return data;
};
export const useFetchUserProfile = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_USER_PROFILE],
    () => getData({ token }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
