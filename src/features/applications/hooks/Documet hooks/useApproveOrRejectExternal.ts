import axios from "axios";
import {  IAuditApproveOrRejectDoc } from "../../types/types";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";

const postData = async (props: IAuditApproveOrRejectDoc) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/update-external-review-status`;

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

export const useApproveOrRejectExternal = () => {
    return useMutation(postData);
}
