import axios from "axios";
import {IApproveOrRejectDoc } from "../types/types";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";


const postData = async (props: IApproveOrRejectDoc) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/update-handover-status`;
  
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

export const useApproveorRejectDoc = () => {
    return useMutation(postData);
}
