import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

export interface IPutAuthorizedPerson extends IUserToken {
  employee: number;
  queryKey: string;
  subject?: string;
}



const handlePutData = async (props: IPutAuthorizedPerson) => {
  const url = `${END_POINT.BASE_URL}admin/authorized-person/${props.employee}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data: any = {
    subject: props.subject,
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const usePutAuthorizedPerson = ({ queryKey, employee }: IPutAuthorizedPerson) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handlePutData);

  const putData = (subject: string) => {
    mutate(
      {
        token,
        subject,
        employee,
        queryKey,
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
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { putData, isLoading };
};
