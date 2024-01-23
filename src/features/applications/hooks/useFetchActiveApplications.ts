import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IActiveApplications } from "../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

const getData = async (): Promise<IActiveApplications[]> => {
    const token = useGetToken();
  
    const url = `${END_POINT.BASE_URL}/admin/active/applicants`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const res = await axios.get(url, config);
    const data: IActiveApplications[] = res.data.data;
    return data;
  }
export const useFetchActiveApplications = () =>  {
    const queryData = useQuery([QUERY_KEY_FOR_APPLICATIONS], () => getData(), {
      onError: () => {},
      onSuccess: () => {},
    });
  
    return queryData;
  };
  