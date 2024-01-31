// import axios from "axios";
// import { useQueryClient, useMutation } from "react-query";
// import { END_POINT } from "src/config/environment";
// import { useGetToken } from "src/hooks/useGetToken";
// import { openNotification } from "src/utils/notification";
// import { QUERY_KEY_FOR_AUTHORIZED_PERSON } from "./useGetAuthorizedPersons";

import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_AUTHORIZED_PERSON } from "./useGetAuthorizedPersons";

// export type TFileUpload = { file: File };
// export interface IPostProps {
//   newData: any;
//   url: string;
// }

// export const postItemData = async ({ newData, url }: IPostProps) => {
//   const token = useGetToken();
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.postForm(url, newData, config);
//   return response;
// };

// export const useUploadFile = () => {
//   const queryClient = useQueryClient();
//   const {
//     mutate,
//     data: fileData,
//     isSuccess: fileUploadSuccess,
//     isLoading: fileUploading,
//   } = useMutation(postItemData);

//   const uploadFile = async (newData: TFileUpload) =>
//     await mutate(
//       {
//         newData,
//         url: `${END_POINT.BASE_URL}/admin/upload-file`,
//       },
//       {
//         onError: (error: any) => {
//           openNotification({
//             state: "error",
//             title: "Error Occured",
//             description: error.response.data.message,
//             duration: 5,
//           });
//         },
//         onSuccess: () => {
//           console.log("file data upload hook response", newData);
//           queryClient.invalidateQueries([QUERY_KEY_FOR_AUTHORIZED_PERSON]);
//         },
//       }
//     );
//   return {
//     uploadFile,
//     fileData,
//     fileUploadSuccess,
//     fileUploading,
//   };
// };

// export default useUploadFile;



// import axios from "axios";
// import { useMutation } from "react-query";
// import { END_POINT } from "src/config/environment";
// import { useGetToken } from "src/hooks/useGetToken";

// type TData = {
//   file: any;
// };

// type TUploadFileApiResponse = {
//   message: string;
//   path: string;
// };

// export const uploadFile = async (props: {
//   data: TData;
//   auth: string;
// }): Promise<TUploadFileApiResponse> => {
//   const url = `${END_POINT.BASE_URL}/admin/upload-file`;
//  const {token}= useGetToken()
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const data: TData = {
//     ...props.data,
//   };

//   const response = await axios.postForm(url, data, config);
//   console.log('res upload', response)
//   const fetchedData: TUploadFileApiResponse = response.data;

//   return fetchedData;
// };

// export const uploadFiles = async (props: {
//   data: {
//     files: any[];
//   };
//   auth:string;
// }): Promise<string[]> => {
//   const uploadFileUrls: string[] = [];
//   for (const item of props.data.files) {
//     const fileUploadResponse = await uploadFile({
//       data: {
//         file: item?.originFileObj,
//       },
//       auth: props.auth,
//     });
//     uploadFileUrls.push(fileUploadResponse.path);
//   }
//   return uploadFileUrls;
// };

// export const useUploadFile = () => {
//   const { token, } = useGetToken();
//   return useMutation((props: { data: TData }) =>
//     uploadFile({
//       data: props.data,
//       auth: token,
//     })
//   );
// };

export interface IPostProps  {
  newData: any;
  url: string;
};

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
 