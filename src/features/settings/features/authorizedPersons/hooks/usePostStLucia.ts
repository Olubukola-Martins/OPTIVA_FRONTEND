import { useGetToken } from "src/hooks/useGetToken";
import { IStLucia } from "../types/postTypes";
import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";

const postData = async (props: IStLucia) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/fee`;
  
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
export const usePostStLucia = () => {
    return useMutation(postData);
}
