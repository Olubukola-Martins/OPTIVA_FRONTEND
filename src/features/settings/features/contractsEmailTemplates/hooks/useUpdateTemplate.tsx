import { useMutation, useQueryClient } from 'react-query';
import { END_POINT } from 'src/config/environment';
import { IEmailTemplateBody } from 'src/features/settings/types/settingsType';
import { editItemData } from 'src/features/settings/utils/settingsAPIHelpers';
import { useGetToken } from 'src/hooks/useGetToken';
import { openNotification } from 'src/utils/notification';


export const QUERY_KEY_EMAIL_TEMPLATES = "EmailContractTemplates";
export const emailContractTemplatesURL =  `${END_POINT.BASE_URL}/admin/template`;
export const editEmailContractTemplatesURL = `${END_POINT.BASE_URL}/admin/update-template`;

const useUpdateTemplate = () => {
//   const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useGetToken();
  const { mutate, isLoading, isSuccess } = useMutation(editItemData);
  const editEmailTemplate = (id: number, newData: IEmailTemplateBody) => {
    mutate(
      { url: `${editEmailContractTemplatesURL}/${id}`, token, newData },
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
          queryClient.invalidateQueries([QUERY_KEY_EMAIL_TEMPLATES]);
        },
      }
    );
  };
  return { editEmailTemplate, isSuccess };
};

export default useUpdateTemplate


