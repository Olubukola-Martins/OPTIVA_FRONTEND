import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { ITemplate } from "../types";

export const QUERY_KEY_FOR_APPLICATION_TEMPLATE = "applicationTemplate";

const getData = async (props: { token: string }):Promise<ITemplate[]> => {
  const url = `${END_POINT.BASE_URL}/admin/templates`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const data:ITemplate[] = res.data.data
  return data
};
export const useGetApplicationTemplate = () => {
    const { token } = useGetUserInfo();
    const queryData = useQuery(
      [QUERY_KEY_FOR_APPLICATION_TEMPLATE],
      () => getData({ token }),
      {
        onError: (err: any) => {},
        onSuccess: (data) => {},
      }
    );
    return queryData;
}
