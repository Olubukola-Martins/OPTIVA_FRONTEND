import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { ICountry, IData } from "../types";

export const QUERY_KEY_FOR_COUNTRY = "country";

const getData = async (props: { token: string }):Promise<ICountry[]> => {
  const url = `${END_POINT.BASE_URL}/admin/countries`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data:ICountry[] = res.data.data
  return data
};

export const useGetCountry = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COUNTRY],
    () => getData({ token }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );
  return queryData;
};
