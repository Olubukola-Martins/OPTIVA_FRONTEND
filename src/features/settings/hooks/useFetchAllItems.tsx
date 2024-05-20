import { useQuery } from "react-query";
import axios from "axios";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { TablePaginationConfig } from "antd";

const getData = async (props: {
  token: string;
  urlEndPoint: string;
  pagination?:TablePaginationConfig;
  search?: string;
  otherParams?:{ [key: string]: any }
}): Promise<any> => {
  const url = `${props.urlEndPoint}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
    params: {
      name: props.search,
      page: props.pagination?.current,
      limit: props.pagination?.pageSize,
      ...props.otherParams
    },
  };

  const res = await axios.get(url, config);
    const item: any = res.data;
  return item;
};

export const useFetchAllItems = ({
  queryKey,
  urlEndPoint,pagination, search,otherParams
}: {
  queryKey: string;
  urlEndPoint: string;
  pagination?: TablePaginationConfig; 
  search?:string,
  otherParams?:{ [key: string]: any }
}) => {
  const { token } = useGetUserInfo();
  const otherParamValues = otherParams ? Object.values(otherParams) : [];
    const queryData = useQuery(

    [queryKey,pagination,...otherParamValues, search],
    () => getData({ token, urlEndPoint,pagination, search , otherParams}),
    {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occured",
          description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: () => {

      },
    }
  );

  return queryData;
};
