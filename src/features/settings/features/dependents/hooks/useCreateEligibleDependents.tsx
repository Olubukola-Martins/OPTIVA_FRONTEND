import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { postItemData } from "src/features/settings/assets/variablesForHooks";
import { IDependentsBody } from "src/features/settings/types/settingsType";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { useApiAuth } from "hooks/useApiAuth";
// import { openNotification } from "utils/notifications";
// import { appRoutes } from "config/router/paths";

// interface IProps extends ICurrentCompany {
//   newData: IDependentsBody;
// }
export const QUERY_KEY_ELIGIBLE_DEPENDENTS = "EligibleDependents";
export const eligibleDependentURL = `${BASE_URL}/admin/eligible-dependant`;
// const postItem = async (props: IProps) => {
// //   const url = eligibleDependentURL;

//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${props.token}`,
//       "x-company-id": props.companyId,
//     },
//   };

//   const response = await axios.post(
//     eligibleDependentURL,
//     props.newData,
//     config
//   );
//   return response;
// };

export const useCreateEligibleDependents = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addEligibleDependents = (newData: IDependentsBody) => {
    mutate(
      {
        url: eligibleDependentURL,
        companyId,
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
