import { END_POINT } from "src/config/environment";
import { ICountry } from "../types";
import axios from "axios";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";
import { QUERY_KEY_FOR_COUNTRY } from "./useGetCountry";

const getData = async (props: { countryId: number; token: string }) => {
  const url = `${END_POINT.BASE_URL}/admin/countries/${props.countryId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: ICountry = { ...item };
  return data;
};

export const useGetSingleCountry = (countryId: number) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COUNTRY],
    () =>
      getData({
        token,
        countryId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (res: any) => {},
    }
  );
  return queryData;
};
