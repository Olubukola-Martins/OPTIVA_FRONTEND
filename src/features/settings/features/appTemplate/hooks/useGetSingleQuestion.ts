import { END_POINT } from "src/config/environment";
import {
  IDataProps,
  ISingleInvestment,
} from "../../investment/hooks/useGetSingleInvestmentRoute";
import { ISingleQuestion } from "../types";
import axios from "axios";
import { useQuery } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

interface IFee extends IDataProps {
  endpointUrl: string;
}
interface IProps extends ISingleInvestment {
  endpointUrl: string;
}

export const QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE = "singleApplicationTemplate";

const getData = async (props: IFee): Promise<ISingleQuestion[]> => {
  const url = `${END_POINT.BASE_URL}/admin/templates/${props.id}/${props.endpointUrl}/questions`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);

  const data: ISingleQuestion[] = res.data.data.map(
    (item: ISingleQuestion) => ({
      ...item,
    })
  );
  return data;
};
export const useGetSingleQuestion = ({ id, endpointUrl }: IProps) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_APPLICATION_TEMPLATE, id],
    () => getData({ id, token, endpointUrl }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
