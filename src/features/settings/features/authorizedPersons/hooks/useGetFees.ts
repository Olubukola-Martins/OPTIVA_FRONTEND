import { END_POINT } from "src/config/environment";
import { IFees } from "../types";
import axios from "axios";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_FEES = "fees";

const getData = async (props: { token: string }): Promise<IFees[]> => {
  const url = `${END_POINT.BASE_URL}/admin/fee`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IFees[] = res.data.data;
  return data;
};

export const useGetFees = () => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([QUERY_KEY_FOR_FEES], () => getData({ token }), {
    onError: () => {},
    onSuccess: () => {},
  });
  return queryData;
};
