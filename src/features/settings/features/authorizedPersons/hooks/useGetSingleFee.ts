import { ISingleFee } from "../types/postTypes";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useQuery } from "react-query";
import { IDataProps, ISingleInvestment } from "../../investment/hooks/useGetSingleInvestmentRoute";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/fee/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data[0];
  const data: ISingleFee = { ...item };
  return data;
};

export const useGetSingleFee =  ({ id, queryKey }: ISingleInvestment) => {
    const { token } = useGetUserInfo();
    const queryData = useQuery([queryKey, id], () => getData({ id, token }), {
      onError: () => {},
      onSuccess: () => {},
    });

  return queryData;
};
