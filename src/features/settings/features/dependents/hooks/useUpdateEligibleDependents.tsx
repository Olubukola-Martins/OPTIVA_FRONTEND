import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { IDependentsBody } from "src/features/settings/types/settingsType";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { QUERY_KEY_ELIGIBLE_DEPENDENTS, eligibleDependentURL } from "./useCreateEligibleDependents";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";

const useUpdateEligibleDependents = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const editEligibleDependents = (id: number, newData: IDependentsBody) => {
    mutate(
      { url: `${eligibleDependentURL}/${id}`,  token, newData },
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
          openNotification({
            state: "success",
            title: "Success",
            description: response.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_ELIGIBLE_DEPENDENTS]);
        },
      }
    );
  };
  return { editEligibleDependents, isSuccess, isLoading };
};

export default useUpdateEligibleDependents;
