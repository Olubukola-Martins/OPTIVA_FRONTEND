import { END_POINT } from "src/config/environment";
import {  IPutCountry } from "../types";
import axios from "axios";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";
import { IDataProps, ISingleInvestment } from "../../investment/hooks/useGetSingleInvestmentRoute";
import { QUERY_KEY_FOR_COUNTRY } from "./useGetCountry";

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/countries/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: IPutCountry = { ...item };
  return data;
};

export const useGetSingleCountry = ({ id, }: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([QUERY_KEY_FOR_COUNTRY, id], () => getData({ id, token }), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};