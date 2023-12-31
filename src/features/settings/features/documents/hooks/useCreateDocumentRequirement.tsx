import { useMutation, useQueryClient } from "react-query";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { IDocRequirementBody } from "src/features/settings/types/settingsType";
import { END_POINT } from "src/config/environment";
import { openNotification } from "src/utils/notification";

export const QUERY_KEY_DOC_REQUIREMENT = "DocumentRequirement";
export const documentRequirementURL = `${END_POINT.BASE_URL}/admin/document-requirement`;


export const useCreateDocumentRequirement = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess } = useMutation(postItemData);
  const addDocumentRequirement = (newData: IDocRequirementBody) => {
    mutate(
      {
        url: documentRequirementURL,
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


