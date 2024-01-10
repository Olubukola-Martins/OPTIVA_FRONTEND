import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

export const QUERY_KEY_FOR_APPLICATIONS = "applications";

const getData = async (props: { token: string }): Promise<any> => {
  const url = `${END_POINT.BASE_URL}/admin/application`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data = res.data.data;
  return data;
};

export const useGetApplication = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATIONS],
    () => getData({ token }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
