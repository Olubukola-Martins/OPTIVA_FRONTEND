import axios from "axios";
import { ICurrency } from "../types/postTypes";
import { END_POINT } from "src/config/environment";
import { useQuery } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

export const QUERY_KEY_FOR_CURRENCY = "currency";

const getData = async (props: { token: string }):Promise<ICurrency[]> => {
  const url = `${END_POINT.BASE_URL}/admin/currency-rates`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: ICurrency[] = res.data.data
  return data
};


export const useGetCurrency =  () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([QUERY_KEY_FOR_CURRENCY], () => getData({ token }), {
    onError: () => {},
    onSuccess: () => {},
  });
  return queryData;
};
