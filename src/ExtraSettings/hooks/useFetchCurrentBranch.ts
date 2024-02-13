import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { userProfileProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_FOR_USER_BRANCH = "branchKey";

const getData = async (): Promise<userProfileProps> => {
 const token = useGetToken()

  const url = `${END_POINT.BASE_URL}/admin/current-branch`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
  const item: userProfileProps = res.data.data;
  const data: userProfileProps = {
    ...item,
  };

  return data;
};
export const useFetchCurrentBranch = () => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_USER_BRANCH],
    () => getData(),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
