import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IAntiguaBarbacudaDonation } from "../types/postTypes";
import { useMutation } from "react-query";

const postData = async (props: IAntiguaBarbacudaDonation) => {
  const token = useGetToken();
  const postUrl = 'admin/fee'
  const putUrl = `admin/fee/${props.id}`
  const requestUrl = props.id ? putUrl : postUrl
    const url = `${END_POINT.BASE_URL}/${requestUrl}`;
  
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const data = {
      ...props,
  };
  const request = props.id? axios.put : axios.post
    const response = await request(url, data, config);
    return response;
  };

export const usePostAntiguaBarbacudaDonation = () => {
  
  return useMutation(postData);
}



// const UserRequest = async (props: branchProps) => {
//   const token = useGetToken();
//   const updateUrl = `/admin/branches/${props.id}`;
//   const addUrl = "/admin/branches";
//   const acceptedUrl = props.id ? updateUrl : addUrl;
//   const url = `${END_POINT.BASE_URL}${acceptedUrl}`;

//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const data = {
//     ...props,
//   };
//   const requestType = props.id ? axios.put : axios.post;
//   const response = await requestType(url, data, config);
//   return response;
// };

// export const useCreateAndUpdateBranch = () => {
//   return useMutation(UserRequest);
// };
