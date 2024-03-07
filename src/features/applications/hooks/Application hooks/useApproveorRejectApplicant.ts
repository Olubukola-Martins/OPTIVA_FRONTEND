import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

const handlePatchData = async (props: { id: number; endpoint: string }) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/${props.endpoint}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(url, null, config);
  return response;
};
export const useApproveorRejectApplicant = (endpoint: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(handlePatchData);
  const patchData = (id: number) => {
    mutate(
      {
        id,
        endpoint,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            duration: 5,
            description: error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATIONS]);
        },
      }
    );
  };
  return { patchData };
};
