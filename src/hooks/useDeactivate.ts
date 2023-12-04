import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { openNotification } from "src/utils/notification";
import { IGeneralProps } from "src/types";
import { useGetToken } from "./useGetToken";

interface IDProps {
  EndPointUrl: string;
  queryKey: string;
  is_active: boolean;
}

const handleDeactivation = async ({
  id,
  EndPointUrl,
  is_active,
}: IGeneralProps) => {
  const url = `${END_POINT.BASE_URL}/${EndPointUrl}${id}`;
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data: any = {
    is_active,
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const useDeactivate = ({ EndPointUrl, queryKey, is_active }: IDProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(handleDeactivation);
  const removeData = (id: number) => {
    mutate(
      { id, EndPointUrl, is_active },
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
