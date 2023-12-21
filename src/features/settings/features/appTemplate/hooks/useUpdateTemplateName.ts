import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { ISingleAppTemplate } from "../types";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "./useGetApplicationTemplate";

const handlePutData = async (props: ISingleAppTemplate) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/templates/${props.id}`;

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

export const useUpdateTemplateName = () => {
  const { mutate, isLoading } = useMutation(handlePutData);
  const queryClient = useQueryClient();
  const putData = (data: ISingleAppTemplate) => {
    mutate(
      {
        ...data,
        id: data.id,
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATION_TEMPLATE]);
        },
      }
    );
  };
  return { putData, isLoading };
};
