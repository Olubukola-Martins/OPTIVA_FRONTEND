import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IGeneralProps } from "src/types";
import { openNotification } from "../../../utils/notification";

interface IDProps {
  deleteEndPointUrl: string;
  queryKey: string;
}

interface IDelete extends IGeneralProps {
  token: string;
  deleteEndPointUrl: string;
}

export const handleDelete = async ({
  id,
  token,
  deleteEndPointUrl,
}: IDelete) => {
  const url = `${END_POINT.BASE_URL}/${deleteEndPointUrl}/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteHandler = ({ queryKey, deleteEndPointUrl }: IDProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handleDelete);
  const removeData = (id: number) => {
    mutate(
      { deleteEndPointUrl, id, token },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.message,
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
  return { removeData, deleteIsLoading: isLoading };
};
