import { END_POINT } from "src/config/environment";
import { IEmployee } from "../types";
import axios from "axios";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_EMPLOYEE = "employee";

const getData = async (props: { token: string }):Promise<IEmployee[]> => {
  const url = `${END_POINT.BASE_URL}/admin/active-employees`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data: IEmployee[] = res.data.data
  return data
};


export const useGetEmployee = () => {
    const { token } = useGetUserInfo();
    const queryData = useQuery(
      [QUERY_KEY_FOR_EMPLOYEE],
      () => getData({ token }),
      {
        onError: (err: any) => {},
        onSuccess: (data) => {},
      }
    );
    return queryData;
  };