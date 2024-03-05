import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { ISendToRoleHead } from "../types/types";

const postData = async (props: ISendToRoleHead) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/assign/head`;
  
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const data = {
      ...props,
    };
    const response = await axios.post(url, data, config);
    return response;
  };
  


export const useSendToRoleHead = () => {
    return useMutation(postData);
}
