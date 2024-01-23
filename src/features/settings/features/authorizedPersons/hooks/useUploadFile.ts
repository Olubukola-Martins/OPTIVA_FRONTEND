import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_AUTHORIZED_PERSON } from "./useGetAuthorizedPersons";

export type TFileUpload = { file: File };
export interface IPostProps  {
  newData: any;
  url: string;
};

export const postItemData = async ({ newData, url }: IPostProps) => {
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
 
  const response = await axios.postForm(url, newData, config);
  return response;
};
 
export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    data: fileData,
    isSuccess: fileUploadSuccess,
    isLoading: fileUploading,
  } = useMutation(postItemData);

  const uploadFile = async(newData: TFileUpload) =>
    await mutate(
      {
        newData,
      url: `${END_POINT.BASE_URL}/admin/upload-file`,
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
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEY_FOR_AUTHORIZED_PERSON]);
        },
      }
    );
  return {
    uploadFile,
    fileData,
    fileUploadSuccess,
    fileUploading,
  };
  // const uploadPaymentProof = async (itemId: string, file: File) => { }
  //   return <div>useUploadPaymentProof</div>;
};
 
export default useUploadFile;
 