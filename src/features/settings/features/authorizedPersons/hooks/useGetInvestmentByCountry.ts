import { END_POINT } from "src/config/environment";
import axios from "axios";
import { useQuery } from "react-query";
import { IInvestmentByCountry } from "../types/postTypes";
import {
  IDataProps,
  ISingleInvestment,
} from "../../investment/hooks/useGetSingleInvestmentRoute";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { QUERY_KEY_FOR_INVESTMENT_ROUTE } from "../../investment/hooks/useGetInvestmentRoute";

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/fee/investment-routes/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item: IInvestmentByCountry[] = res.data.data;
  return item;
};

export const useGetInvestmentByCountry = ({
  id,
}: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([QUERY_KEY_FOR_INVESTMENT_ROUTE, id], () => getData({ id, token }), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
