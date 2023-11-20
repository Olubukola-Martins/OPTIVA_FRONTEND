import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { postItemData } from "src/features/settings/assets/variablesForHooks";
import { IDocRequirementBody } from "src/features/settings/types/settingsType";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { useApiAuth } from "hooks/useApiAuth";
// import { ICurrentCompany } from "types";
// import { openNotification } from "utils/notifications";
// import { appRoutes } from "config/router/paths";


// export const postItem = async (props: IProps) => {

//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${props.token}`,
//       "x-company-id": props.companyId,
//     },
//   };

//   const response = await axios.post(
//     documentRequirementURL,
//     props.newData,
//     config
//   );
//   return response;
// };

export const QUERY_KEY_DOC_REQUIREMENT = "DocumentRequirement";
export const documentRequirementURL = `${BASE_URL}/admin/document-requirement`;


export const useCreateDocumentRequirement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addDocumentRequirement = (newData: IDocRequirementBody) => {
    mutate(
      {
        companyId,
        url:documentRequirementURL,
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
          queryClient.invalidateQueries([QUERY_KEY_DOC_REQUIREMENT]);
        },
      }
    );
  };
  return {
    addDocumentRequirement,
    postDocLoading: isLoading,
    addDocSuccess: isSuccess,
  };
};
