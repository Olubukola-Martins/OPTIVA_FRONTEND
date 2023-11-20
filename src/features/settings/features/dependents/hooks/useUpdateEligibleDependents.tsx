import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  QUERY_KEY_ELIGIBLE_DEPENDENTS,
  eligibleDependentURL,
} from "./UseCreateEligibleDependents";
import { IDependentsBody } from "src/features/settings/types/settingsType";
import { editItemData } from "src/features/settings/assets/variablesForHooks";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { ICurrentCompany } from "types";
// import { useApiAuth } from "hooks/useApiAuth";
// import { openNotification } from "utils/notifications";
// import { appRoutes } from "config/router/paths";

// interface IEditEligibleDependents extends ICurrentCompany {
//   id: number;
//   newData: IDependentsBody;
// }

// const editEligibleDependentsData = async (props: IEditEligibleDependents) => {
//     const url = `${eligibleDependentURL}/${props.id}`;
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${props.token}`,
//       "x-company-id": props.companyId,
//     },
//   };

//   const response = await axios.put(url, props.newData, config);
//   return response;
// };

const useUpdateEligibleDependents = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const editEligibleDependents = (id: number, newData: IDependentsBody) => {
    mutate(
      { url: `${eligibleDependentURL}/${id}`, companyId, token, newData },
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
  return { editEligibleDependents };
};

export default useUpdateEligibleDependents;
