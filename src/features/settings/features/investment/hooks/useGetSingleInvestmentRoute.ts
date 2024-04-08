import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { IInvestmentRoute } from "../types";
import { QUERY_KEY_FOR_INVESTMENT_ROUTE } from "./useGetInvestmentRoute";

export interface IDataProps extends IUserToken {
  id: number | null;
  section?:string
}

export interface ISingleInvestment {
  id: number;
  queryKey?: string;
  section?:string
}

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/investment-route/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: IInvestmentRoute = { ...item };
  return data;
};

export const useGetSingleInvestmentRoute = ({ id }: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([QUERY_KEY_FOR_INVESTMENT_ROUTE, id], () => getData({ id, token }), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
