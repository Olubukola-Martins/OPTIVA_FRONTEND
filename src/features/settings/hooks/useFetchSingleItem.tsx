import { useQuery } from "react-query";
import axios from "axios";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const getData = async (props: {
  token: string;
    itemId: number;
  urlEndPoint: string
}) => {
  const url = `${props.urlEndPoint}/${props.itemId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data;

  return item;
};

export const useFetchSingleItem = ({
  itemId,
  queryKey,
  urlEndPoint,
}: {
  itemId: number;
  queryKey: string;
  urlEndPoint: string;
}) => {
  const {  token } = useGetUserInfo();
  const queryData = useQuery(
    [queryKey],
    () => getData({ token, itemId, urlEndPoint }),
    {
      onError: (error: any) => {
        openNotification({
          state: "error",
          title: "Error Occured",
          description: "",
          // description: error.response.data.message,
          duration: 5,
        });
      },
      onSuccess: (res) => {
        // openNotification({
        //   state: "success",
        //   title: "Success",
        //   description: res.message,
        // });
      },
    }
  );

  return queryData;
};
