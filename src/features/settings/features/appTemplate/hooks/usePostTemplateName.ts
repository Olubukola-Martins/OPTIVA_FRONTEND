import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IAppTemplateName } from "../types";
import { useMutation } from "react-query";

const postData = async (props: IAppTemplateName) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/templates`;
  
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

export const usePostTemplateName = () => {
    return useMutation(postData);
}
