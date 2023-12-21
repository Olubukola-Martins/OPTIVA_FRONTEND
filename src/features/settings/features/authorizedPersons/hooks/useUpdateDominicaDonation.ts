import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { IDominicaDonation } from "../types/postTypes";
import { QUERY_KEY_FOR_FEES } from "./useGetFees";

const handlePutData = async (props: IDominicaDonation) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/fee/${props.id}`;
  
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

export const useUpdateDominicaDonation =  () => {
    const { mutate, isLoading } = useMutation(handlePutData);
    const queryClient = useQueryClient();
    const putData = (data: IDominicaDonation) => {
      mutate(
        {
          id: data.id,
          ...data,
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
              description: res.message,
            });
            queryClient.invalidateQueries([QUERY_KEY_FOR_FEES]);
          },
        }
      );
      };
      return { putData, isLoading };
  };
  