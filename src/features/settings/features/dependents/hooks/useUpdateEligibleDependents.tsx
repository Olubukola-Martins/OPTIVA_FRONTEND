import { useMutation, useQueryClient } from "react-query";
import { IDependentsBody } from "src/features/settings/types/settingsType";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "./useCreateEligibleDependents";
import { openNotification } from "src/utils/notification";

const useUpdateEligibleDependents = () => {
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const queryClient = useQueryClient();
  const editEligibleDependents = (id: number, newData: IDependentsBody) => {
    mutate(
      { newData, id, url: eligibleDependentURL },
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
          queryClient.invalidateQueries([QUERY_KEY_ELIGIBLE_DEPENDENTS, id]);
        },
      }
    );
  };
  return { editEligibleDependents, isSuccess, isLoading };
};

export default useUpdateEligibleDependents;
