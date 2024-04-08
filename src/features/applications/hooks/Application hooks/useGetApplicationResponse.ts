import axios from "axios";
import { IGetApplicationResponse } from "../../types/types";
import { END_POINT } from "src/config/environment";
import { useQuery } from "react-query";
import {
  IDataProps,
  ISingleInvestment,
} from "src/features/settings/features/investment/hooks/useGetSingleInvestmentRoute";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

const getData = async (props: IDataProps) => {
  const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/${props.section}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  console.log('item res', item)
  const data: IGetApplicationResponse[] = item;
  return data;
};

export const useGetApplicationResponse = ({
  id,
  section,
}: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATIONS, id, section],
    () => getData({ id, token, section }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
