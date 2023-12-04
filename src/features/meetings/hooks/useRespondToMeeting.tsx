import { useMutation, useQueryClient } from "react-query";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_MEETINGS, meetingsURL } from "../pages/Meetings";

const useRespondToMeeting = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading: responseLoading,
  } = useMutation(postItemData);
  const respondMeeting = (meetingId: number, newData: { response: string }) =>
    mutate(
      {
        url: `${meetingsURL}/${meetingId}/respond`,
        newData,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.message,
            duration: 5,
          });
        },
        onSuccess: (response: any) => {
          openNotification({
            state: "success",
            title: "Success",
            duration: 5,
            description: response.message,
          });
          //   form.resetFields();
          queryClient.invalidateQueries([QUERY_KEY_MEETINGS, meetingId]);
        },
      }
    );
  return { respondMeeting, responseLoading };
};

export default useRespondToMeeting;
