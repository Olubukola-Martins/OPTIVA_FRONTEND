import { END_POINT } from "src/config/environment";
import { IDataProps, ISingleInvestment } from "../../investment/hooks/useGetSingleInvestmentRoute";
import axios from "axios";
import { IGetSingleProgramType } from "../types";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";
import { QUERY_KEY_FOR_PROGRAM_TYPE } from "./useGetProgramType";

const getData = async (props: IDataProps) => {
    const url = `${END_POINT.BASE_URL}/admin/programtypes/${props.id}`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    };
  
    const res = await axios.get(url, config);
    const item = res.data.data;
    const data: IGetSingleProgramType = { ...item };
    return data;
  };
  
export const useGetSingleProgram = ({ id }: ISingleInvestment) => {
    const { token } = useGetUserInfo();
    const queryData = useQuery([QUERY_KEY_FOR_PROGRAM_TYPE, id], () => getData({ id, token }), {
      onError: () => {},
      onSuccess: () => {},
    });
  
    return queryData;
  };