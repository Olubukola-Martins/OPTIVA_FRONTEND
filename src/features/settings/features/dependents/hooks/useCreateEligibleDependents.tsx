import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { IDependentsBody } from "src/features/settings/types/settingsType";
import { openNotification } from "src/utils/notification";
export const QUERY_KEY_ELIGIBLE_DEPENDENTS = "EligibleDependents";
export const eligibleDependentURL = `${END_POINT.BASE_URL}/admin/eligible-dependant`;

export const useCreateEligibleDependents = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addEligibleDependents = (
    newData: IDependentsBody,
    onSuccess?: () => void
  ) => {
    mutate(
      {
        url: eligibleDependentURL,
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
          openNotification({
            state: "success",
            title: "Success",
            description: response.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_ELIGIBLE_DEPENDENTS]);
          onSuccess && onSuccess() ;
        },
      }
    );
  };
  return {
    addEligibleDependents,
    postDependtsLoading: isLoading,
    addDependentsSuccess: isSuccess,
  };
};
