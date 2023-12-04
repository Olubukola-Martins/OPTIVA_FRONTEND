import { useQuery } from "react-query";
import { useGetToken } from "src/hooks/useGetToken";
import { QUERY_KEY_EMAIL_TEMPLATES } from "./useUpdateTemplate";
import { END_POINT } from "src/config/environment";
import axios from "axios";

export const QUERY_KEY_FOR_SINGLE_TASK = "single-task";
const getData = async (type: string): Promise<any> => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/${type}-email-template`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item: any = res.data;

  return item;
};

export const useGetSingleTemplate = (type: string) => {
  const queryData = useQuery(
    [QUERY_KEY_EMAIL_TEMPLATES, type],
    () => getData(type),
    {
       enabled:!!type,
      onError: () => {},
      onSuccess: () => {
      },
    }
  );

  return queryData;
};
