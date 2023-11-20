import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  QUERY_KEY_DOC_REQUIREMENT,
  documentRequirementURL,
} from "./useCreateDocumentRequirement";
import { IDocRequirementBody } from "src/features/settings/types/settingsType";
import { editItemData } from "src/features/settings/assets/variablesForHooks";

const useUpdateDocumentRequirement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const editDocumentRequirement = (
    id: number,
    newData: IDocRequirementBody
  ) => {
    mutate(
      { url: `${documentRequirementURL}/${id}`, companyId, token, newData },
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
          queryClient.invalidateQueries([QUERY_KEY_DOC_REQUIREMENT]);
        },
      }
    );
  };
  return { editDocumentRequirement };
};

export default useUpdateDocumentRequirement;
