import { useMutation} from "react-query";
import { useGetToken } from "src/hooks/useGetToken";
import { IPostProps } from "src/features/settings/utils/settingsAPIHelpers";
import axios from "axios";

export type TFileUpload = { file: File };
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

const useUploadFile = () => {
  const {
    mutate:fileMutate,
    data: fileData,
    isSuccess: fileUploadSuccess,
    isLoading: fileUploading,
  } = useMutation(postItemData);
  return {
    fileMutate,
    fileData,
    fileUploadSuccess,
    fileUploading,
  };
  // const uploadPaymentProof = async (itemId: string, file: File) => { }
  //   return <div>useUploadPaymentProof</div>;
};

export default useUploadFile;
