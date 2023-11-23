import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

interface IDeleteItem extends IUserToken {
  itemId: number;
  token: string;
  deleteEndpointUrl: string;
  queryKey: string;
}

interface IDProps {
  deleteEndpointUrl: string;
  queryKey: string;
}

export const handleDeleteData = async (props: IDeleteItem) => {
  //   const url = `${END_POINT.BASE_URL}/${props.deleteEndpointUrl}/${props.itemId}`;
    const url = `${props.deleteEndpointUrl}/${props.itemId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteItem = ({ queryKey, deleteEndpointUrl }: IDProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handleDeleteData);
  const deleteData = (itemId: number) => {
    mutate(
      {
        deleteEndpointUrl,
        itemId,
        token,
        queryKey,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { deleteData, deleteIsLoading: isLoading };
};
