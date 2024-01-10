import { useMutation, useQueryClient } from "react-query";
import {
  QUERY_KEY_DOC_REQUIREMENT,
  documentRequirementURL,
} from "./useCreateDocumentRequirement";
import { IDocRequirementBody } from "src/features/settings/types/settingsType";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { openNotification } from "src/utils/notification";

const useUpdateDocumentRequirement = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(editItemData);
  const editDocumentRequirement = (
    id: number,
    newData: IDocRequirementBody
  ) => {
    mutate(
      { url: documentRequirementURL, newData,id },
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
          queryClient.invalidateQueries([QUERY_KEY_DOC_REQUIREMENT, id]);
        },
      }
    );
  };
  return { editDocumentRequirement,isLoading };
};

export default useUpdateDocumentRequirement;
