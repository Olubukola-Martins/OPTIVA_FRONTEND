import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IPostCurrency } from "../types/postTypes";

const postData = async (props: IPostCurrency) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/currency-rates`;
  
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
export const usePostCurrency = () => {
    return useMutation(postData);
}
