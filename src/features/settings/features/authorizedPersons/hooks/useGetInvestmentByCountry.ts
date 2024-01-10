import { END_POINT } from "src/config/environment";
import axios from "axios";
import { useQuery } from "react-query";
import { IInvestmentByCountry } from "../types/postTypes";
import {
  IDataProps,
  ISingleInvestment,
} from "../../investment/hooks/useGetSingleInvestmentRoute";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/fee/investment-routes/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item: IInvestmentByCountry[] = res.data;
  return item;
};

export const useGetInvestmentByCountry = ({
  id,
  queryKey,
}: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([queryKey, id], () => getData({ id, token }), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
