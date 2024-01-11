import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_TIMELINE_EXTENSIONS } from "./useFetchTimelineExtensions";

const handlePatchData = async (props: {
  id: number;
  endpoint: string;
  reason: string;
}) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/extension/${props.endpoint}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

    const body = {
        reason: props.reason
    }
  const response = await axios.patch(url, body, config);
  return response;
};

export const useRejectTimeline = (endpoint: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(handlePatchData);
  const patchData = (id: number,  reason: string) => {
    mutate(
      {
        id,
        endpoint,
       reason,
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
            description: res.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIMELINE_EXTENSIONS]);
        },
      }
    );
  };
  return { patchData };
};
