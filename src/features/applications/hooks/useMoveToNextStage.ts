import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";


const handlePatchData = async (props: { milestone_id: number;  }) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/application/${props.milestone_id}/change/stage`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(url, null, config);
  return response;
};
export const useMoveToNextStage = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(handlePatchData);
  const patchData = (milestone_id: number) => {
    mutate(
      {
        milestone_id,
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
