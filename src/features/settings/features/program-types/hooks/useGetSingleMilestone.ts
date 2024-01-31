import { END_POINT } from "src/config/environment";
import { IDataProps, ISingleInvestment, } from "../../investment/hooks/useGetSingleInvestmentRoute";
import axios from "axios";
import { ISingleMilestone } from "../types";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";
import { QUERY_KEY_FOR_MILESTONE } from "./useGetMilestone";

const getData = async (props: IDataProps) => {
    const url = `${END_POINT.BASE_URL}/admin/milestone/${props.id}`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    };
  
    const res = await axios.get(url, config);
    const item = res.data.data;
    const data: ISingleMilestone = { ...item };
    return data;
  };
  
  
export const useGetSingleMilestone =({ id,  }: ISingleInvestment) => {
    const { token } = useGetUserInfo();
    const queryData = useQuery([QUERY_KEY_FOR_MILESTONE, id], () => getData({ id, token }), {
      onError: () => {},
      onSuccess: () => {},
    });
  
    return queryData;
  };