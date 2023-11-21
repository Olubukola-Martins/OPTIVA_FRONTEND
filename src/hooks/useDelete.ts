import { useMutation, useQueryClient } from "react-query";
import { useGetUserInfo } from "./useGetUserInfo";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { openNotification } from "src/utils/notification";
import { IGeneralProps } from "src/types";


interface IDProps {
    deleteEndPointUrl: string;
    queryKey: string;
  }

 const handleDelete = async ({
  id,
  token,
  deleteEndPointUrl,
}: IGeneralProps) => {
  const url = `${END_POINT.BASE_URL}/${deleteEndPointUrl}${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};

export const useDelete = ({ deleteEndPointUrl, queryKey }: IDProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(handleDelete);
  const { token } = useGetUserInfo();

  const removeData = (id: number) => {
    mutate(
      { id, token, deleteEndPointUrl },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 4.5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: "Deleted Successfully",
            duration: 4.5,
          });

          queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
      }
    );
  };

  return { removeData };
};
