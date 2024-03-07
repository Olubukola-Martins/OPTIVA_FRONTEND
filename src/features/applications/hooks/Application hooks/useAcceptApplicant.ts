import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IAcceptApplicant } from "../../types/types";
import { useMutation } from "react-query";

const postData = async (props: IAcceptApplicant) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/applicants/accept`;

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
export const useAcceptApplicant = () => {
  return useMutation(postData);
};
