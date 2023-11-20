import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { postItemData } from "src/features/settings/assets/variablesForHooks";
import { IEscalationBody } from "src/features/settings/types/settingsType";

export const QUERY_KEY_ESCALATION = "Escalation";
export const escalationURL = `${BASE_URL}/admin/escalation`;

export const useAddEscalation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addDocumentRequirement = (newData: IEscalationBody) => {
    mutate(
      {
        companyId,
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
    addDocumentRequirement,
    postEscalationoading: isLoading,
    addEscalationSuccess: isSuccess,
  };
};

export default useAddEscalation