import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { IEscalationBody } from "src/features/settings/types/settingsType";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";

export const QUERY_KEY_ESCALATION = "Escalation";
export const escalationURL = `${END_POINT.BASE_URL}/admin/escalation`;

export const useAddEscalation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token,  } = useGetUserInfo();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addEscalation = (newData: IEscalationBody) => {
    mutate(
      {
        url: escalationURL,
        token,
        newData,
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
        onSuccess: (response: any) => {
          // navigate(appRoutes.recruitmentDashboard);
          openNotification({
            state: "success",
            title: "Success",
            description: response.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_ESCALATION]);
        },
      }
    );
  };
  return {
    addEscalation,
    postEscalationoading: isLoading,
    addEscalationSuccess: isSuccess,
  };
};

export default useAddEscalation;
