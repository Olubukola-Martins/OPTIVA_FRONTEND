import { useMutation, useQueryClient } from "react-query";
import {
  IAllEligiDependentsResponse,
  IDependentsBody,
  ISingleEligibleDependent,
} from "src/features/settings/types/settingsType";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "./useCreateEligibleDependents";
import { openNotification } from "src/utils/notification";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { useGetToken } from "src/hooks/useGetToken";

const useUpdateEligibleDependents = () => {
  const { token } = useGetToken();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const queryClient = useQueryClient();
  const editEligibleDependents = (id: number, newData: IDependentsBody) => {
    mutate(
      { newData, id, token, url: eligibleDependentURL },
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
            title: "Success",
            description: response.data.message,
            state: "success",
          });
          // queryClient.invalidateQueries([QUERY_KEY_ELIGIBLE_DEPENDENTS]);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_ELIGIBLE_DEPENDENTS],
            // exact: true,
          });
        },
      }
    );
  };
  return { editEligibleDependents, isSuccess, isLoading };
};

export default useUpdateEligibleDependents;
