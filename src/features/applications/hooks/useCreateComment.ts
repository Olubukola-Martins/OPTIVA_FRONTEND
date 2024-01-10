import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { ICreateComment } from "../types/types";

const postData = async (props: ICreateComment) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/application/comment`;
  
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
export const useCreateComment = () => {
    return useMutation(postData);
}
