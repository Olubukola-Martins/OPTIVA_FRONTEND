import { QUERY_KEY_ESCALATION, escalationURL } from "./useAddEscalation";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { IEscalationBody } from "src/features/settings/types/settingsType";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const useUpdateEscalation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const editEscalation = (
    id: number,
    newData: Omit<IEscalationBody, "escalation_name">
  ) => {
    mutate(
      { url: `${escalationURL}/${id}`, token, newData },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (response: { data: { message: string } }) => {
          //   navigate(appRoutes.recruitmentDashboard);
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
  return { editEscalation };
};

export default useUpdateEscalation;
