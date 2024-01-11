import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IInvestmentRoute } from "../types";

export const QUERY_KEY_FOR_INVESTMENT_ROUTE = "investmentRoute";

const getData = async (props: { token: string }):Promise<IInvestmentRoute[]> => {
  const url = `${END_POINT.BASE_URL}/admin/investment-route`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IInvestmentRoute[] = res.data.data
  
  return data
};

export const useGetInvestmentRoute = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_INVESTMENT_ROUTE],
    () => getData({ token }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
