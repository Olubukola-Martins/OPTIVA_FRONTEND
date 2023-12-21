import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IDataProps, ISingleInvestment } from "../../investment/hooks/useGetSingleInvestmentRoute";
import { ISingleAppTemplate } from "../types";
import { useQuery } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const getData = async (props: IDataProps) => {
    const url = `${END_POINT.BASE_URL}/admin/templates/${props.id}`;
 
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    };
  
    const res = await axios.get(url, config);
  const item = res.data.data;

    const data: ISingleAppTemplate = { ...item };
    return data;
  };
  

export const useGetSingleApplicationTemplate = ({ id, queryKey }: ISingleInvestment) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery([queryKey, id], () => getData({ id, token }), {
    onError: () => {},
    onSuccess: () => {},
  });

return queryData;
};


