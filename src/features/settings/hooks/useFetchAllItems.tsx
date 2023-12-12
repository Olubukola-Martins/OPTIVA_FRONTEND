import { useQuery } from "react-query";
import axios from "axios";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const getData = async (props: {
  token: string;
  urlEndPoint: string;
}): Promise<any> => {
  const url = `${props.urlEndPoint}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
    const item: any = res.data;

  return item;
};

export const useFetchAllItems = ({
  queryKey,
  urlEndPoint,
}: {
  queryKey: string;
  urlEndPoint: string;
}) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [queryKey],
    () => getData({ token, urlEndPoint }),
    {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occured",
          //   description: "",
          description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: (res) => {
        // openNotification({
        //   state: "success",
        //   title: "Success",
        //   description: res.data.message,
        // });
      },
    }
  );

  return queryData;
};
