import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { ICurrentCompany } from "types";
// import { openNotification } from "utils/notifications";

interface IDeleteItem extends ICurrentCompany {
  itemId: number;
  deleteEndpointUrl: string;
  queryKey: string;
}

interface IDProps {
  deleteEndpointUrl: string;
  queryKey: string;
}

export const handleDeleteData = async (props: IDeleteItem) => {
  //   const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/${props.deleteEndpointUrl}/${props.itemId}`;
     const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/${props.deleteEndpointUrl}/${props.itemId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    //   "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteItem = ({ queryKey, deleteEndpointUrl }: IDProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handleDeleteData);
  const deleteData = (itemId: number) => {
    mutate(
      {
        companyId,
        deleteEndpointUrl,
        itemId,
        token,
        queryKey,
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
            description: res.data.message,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { deleteData, deleteIsLoading: isLoading };
};
