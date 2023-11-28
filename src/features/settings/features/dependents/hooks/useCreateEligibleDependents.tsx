import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { END_POINT } from "src/config/environment";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { IDependentsBody } from "src/features/settings/types/settingsType";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { openNotification } from "src/utils/notification";
export const QUERY_KEY_ELIGIBLE_DEPENDENTS = "EligibleDependents";
export const eligibleDependentURL = `${END_POINT.BASE_URL}/admin/eligible-dependant`;

export const useCreateEligibleDependents = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addEligibleDependents = (newData: IDependentsBody) => {
    mutate(
      {
        url: eligibleDependentURL,
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
          //   navigate(appRoutes.recruitmentDashboard);
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
  return {
    addEligibleDependents,
    postDependtsLoading: isLoading,
    addDependentsSuccess: isSuccess,
  };
};
