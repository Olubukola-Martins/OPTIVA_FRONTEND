import { useQuery } from "react-query";
import axios from "axios";
import { openNotification } from "src/utils/notification";
import { useGetToken } from "src/hooks/useGetToken";

const getData = async (props: {
    itemId: number;
  urlEndPoint: string
}) => {
  const url = `${props.urlEndPoint}/${props.itemId}`;
  const token = useGetToken();

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data;
// return res
  return item;
};

export const useFetchSingleItem = ({
  itemId,
  queryKey,
  urlEndPoint,
  // onSuccessAction
}: {
  itemId: number;
  queryKey: string;
  urlEndPoint: string;
  // onSuccessAction?: any;
}) => {
  // const queryClient = useQueryClient();
  const queryData = useQuery(
    [queryKey, itemId],
    () => getData({ itemId, urlEndPoint }),
    {
      enabled: !!itemId,
      onError: (error:any) => {
        console.log("error",error)
        openNotification({
          state: "error",
          title: "Error Occured",
          // description: "",
          description: error.response.data.message as string,
          duration: 5,
        });
      },
      onSuccess: (res) => {
        console.log("res", res);
        // {onSuccessAction}
        // queryClient.invalidateQueries([queryKey,itemId])
      },
    }
  );

  return queryData;
};
