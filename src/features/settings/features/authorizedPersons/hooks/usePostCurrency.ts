import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IPostCurrency } from "../types/postTypes";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_CURRENCY } from "./useGetCurrency";

const postData = async (props: IPostCurrency) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/update/currency-rates`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ...props,
  };
  const response = await axios.put(url, data, config);
  return response;
};
export const usePostCurrency = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postData);

  const putData = (data: IPostCurrency) => {
    mutate(
      {
        ...data,
      },
      {
        onError: () => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: "Error",
            duration: 5,
          });
        },
        onSuccess: () => {
          openNotification({
            state: "success",
            title: "Success",
            description: "Suucess",
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_CURRENCY]);
        },
      }
    );
  };

  return { putData, isLoading };
};
