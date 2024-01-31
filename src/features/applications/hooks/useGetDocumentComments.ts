import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IDocumentComment } from "../types/types";

export const QUERY_KEY_FOR_DOCUMENT_COMMENT = "documentComment";

const getData = async (props: {
  token: string;
  id: number;
}): Promise<IDocumentComment[]> => {
  const url = `${END_POINT.BASE_URL}/admin/comments/${props.id}`;
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
export const useGetDocumentComments = (id: number) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_DOCUMENT_COMMENT],
    () => getData({ token, id }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
