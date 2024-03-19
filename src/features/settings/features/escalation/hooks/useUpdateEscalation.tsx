import { QUERY_KEY_ESCALATION, escalationURL } from "./useAddEscalation";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { useMutation, useQueryClient } from "react-query";
import { openNotification } from "src/utils/notification";
import { useNavigate } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";

const useUpdateEscalation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const editEscalation = (
    id: number,
    newData: any
  ) => {
    mutate(
      { url: escalationURL, newData ,id},
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
          openNotification({
            state: "success",
            title: "Success",
            description: response.data.message,
          });
          navigate(appRoute.escalation);
          queryClient.invalidateQueries([QUERY_KEY_ESCALATION, id]);
        },
      }
    );
  };
  return { editEscalation, isLoading, isSuccess };
};

export default useUpdateEscalation;
