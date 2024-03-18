import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IDataProps, ISingleInvestment } from "../../investment/hooks/useGetSingleInvestmentRoute";
import { IProgramCountry } from "../types/postTypes";
import { useQuery } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { QUERY_KEY_FOR_COUNTRY } from "../../program-types/hooks/useGetCountry";

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/fee/program-types/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

    const res = await axios.get(url, config);
  const item: IProgramCountry[] = res.data.data;
  return item;
};

export const useGetCountryByProgram = ({ id  }: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([QUERY_KEY_FOR_COUNTRY, id], () => getData({ id, token }), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
