import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IGetProcessingStrategy } from "../../types/types";

export const QUERY_KEY_FOR_PROCESSING_STRATEGY_AND_STEPS =
  "processingStrategyAndSteps";

const getData = async (props: {
  token: string;
  id: number;
}): Promise<IGetProcessingStrategy[]> => {
  const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/strategy`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data = res.data.data;
  return data;
};

export const useGetProcessingStrategy = (id: number) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PROCESSING_STRATEGY_AND_STEPS],
    () => getData({ token, id }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );
  return queryData;
};
