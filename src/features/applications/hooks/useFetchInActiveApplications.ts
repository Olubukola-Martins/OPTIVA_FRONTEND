import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IIanctiveApplications } from "../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

const getData = async (): Promise<IIanctiveApplications[]> => {
    const token = useGetToken();
  
    const url = `${END_POINT.BASE_URL}/admin/inactive/applicants`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const res = await axios.get(url, config);
    const data: IIanctiveApplications[] = res.data.data;
    return data;
  }

export const useFetchInActiveApplications =  () =>  {
    const queryData = useQuery([QUERY_KEY_FOR_APPLICATIONS], () => getData(), {
      onError: () => {},
      onSuccess: () => {},
    });
  
    return queryData;
  };
  