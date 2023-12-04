import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

interface IDeleteAuthorisedPerson extends IUserToken {
    authorizedId: number;
    queryKey:string
}

const deleteData = async (props: IDeleteAuthorisedPerson) => {
  const url = `${END_POINT.BASE_URL}/applications/${props.authorizedId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const res = await axios.delete(url, config);
  const data = res.data.data;
  return data;
};

export const useDeleteAuthorizedPerson = (queryKey: string) => {
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(deleteData);
  const queryClient = useQueryClient();
  const removeAuthorizedPerson = (authorizedId: number) =>
    mutate(
      {
        authorizedId,
        token,
        queryKey,
      },
      {
        onError: () => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: 'An error occured',
            duration: 5,
          });
        },
        onSuccess: () => {
          openNotification({
            state: "success",
            title: "Success",
            description: 'Success',
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );

  return { removeAuthorizedPerson, isLoading };
};
