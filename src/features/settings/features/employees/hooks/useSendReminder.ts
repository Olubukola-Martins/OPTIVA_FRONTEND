import { useMutation } from "react-query";
import axios from "axios";
import { END_POINT } from "src/config/environment";
import { openNotification } from "src/utils/notification";
import { IGeneralProps } from "src/types";
import { useGetToken } from "src/hooks/useGetToken";

const handleReminder = async ({ id }: IGeneralProps) => {
  const url = `${END_POINT.BASE_URL}/admin/employee-reminder/${id}`;
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, { id }, config);
  return response;
};

export const useSendReminder = () => {
  const { mutate } = useMutation(handleReminder);
  const remindUser = (id: number) => {
    mutate(
      { id },
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
        },
      }
    );
  };

  return { remindUser };
};
