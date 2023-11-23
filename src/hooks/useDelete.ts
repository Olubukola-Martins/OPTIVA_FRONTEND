import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { openNotification } from "src/utils/notification";
import { IGeneralProps } from "src/types";
import { useGetToken } from "./useGetToken";

interface IDProps {
    deleteEndPointUrl: string;
    queryKey: string;
  }

 const handleDelete = async ({
  id,
  deleteEndPointUrl,
}: IGeneralProps) => {
  const url = `${END_POINT.BASE_URL}/${deleteEndPointUrl}${id}`;
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDelete = ({ deleteEndPointUrl, queryKey }: IDProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(handleDelete);

  const removeData = (id: number) => {
    mutate(
      { id, deleteEndPointUrl },
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
            description: res.data.message,
            duration: 4.5,
          });

          queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
      }
    );
  };

  return { removeData };
};
