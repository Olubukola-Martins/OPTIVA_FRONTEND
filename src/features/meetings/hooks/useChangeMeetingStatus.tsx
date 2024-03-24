import { useMutation, useQueryClient } from "react-query";
import {   QUERY_KEY_MEETINGS, meetingsURL } from "../pages/Meetings";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { openNotification } from "src/utils/notification";

const useChangeMeetingStatus = () => {
      const queryClient = useQueryClient();
      const { mutate, isLoading: statusChangeLoading } =
        useMutation(postItemData);
      const changeMeetingStatus = (
        meetingId: number,
        newData: { response: number }
      ) =>
        mutate(
          {
            url: `${meetingsURL}/${meetingId}/status`,
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
              queryClient.refetchQueries([QUERY_KEY_MEETINGS]);
            },
          }
        );
      return { changeMeetingStatus, statusChangeLoading };

};

export default useChangeMeetingStatus