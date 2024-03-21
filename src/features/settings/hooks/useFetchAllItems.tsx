import { useQuery } from "react-query";
import axios from "axios";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { TablePaginationConfig } from "antd";

const getData = async (props: {
  token: string;
  urlEndPoint: string;
  // pagination?: {
  //   pageSize?: number;
  //   current?: number;
  // };
  pagination?:TablePaginationConfig;
  search?: string;
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
    },
  };

  const res = await axios.get(url, config);
    const item: any = res.data;
  //  const total= res.data.meta.total

  // return {item,total};
  return item;
};

export const useFetchAllItems = ({
  queryKey,
  urlEndPoint,pagination, search,
}: {
  queryKey: string;
  urlEndPoint: string;
  pagination?: TablePaginationConfig; 
  search?:string,
}) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [queryKey,pagination, search,],
    () => getData({ token, urlEndPoint,pagination, search }),
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
