import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IProgram } from "../types";

const UserRequest = async (props: IProgram) => {
    const token = useGetToken();
    const updateUrl = `/admin/programtypes/${props.id}`;
    const addUrl = "/admin/programtypes";
    const acceptedUrl = props.id ? updateUrl : addUrl;
    const url = `${END_POINT.BASE_URL}${acceptedUrl}`;
  
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const data = {
      ...props,
    };
    const requestType = props.id ? axios.put : axios.post;
    const response = await requestType(url, data, config);
    return response;
  };
  

export const useCreateAndUpdateProgramType = () => {
    return useMutation(UserRequest);
}
