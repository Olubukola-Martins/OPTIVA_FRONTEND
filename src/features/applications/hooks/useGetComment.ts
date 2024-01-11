import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IComment } from "../types/types";

export const QUERY_KEY_FOR_COMMENT = "comment";

const getData = async (props: { token: string , id:number}): Promise<IComment[]> => {
  const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/comment`;
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

export const useGetComment = (id:number) => {
    const { token } = useGetUserInfo();
    const queryData = useQuery(
      [QUERY_KEY_FOR_COMMENT],
      () => getData({ token, id }),
      {
        onError: () => {},
        onSuccess: () => {},
      }
    );
    return queryData;
  };