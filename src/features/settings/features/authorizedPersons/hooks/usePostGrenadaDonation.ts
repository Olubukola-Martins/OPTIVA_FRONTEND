import { useGetToken } from "src/hooks/useGetToken";
import { IGrenadaDonation } from "../types/postTypes";
import { END_POINT } from "src/config/environment";
import axios from "axios";
import { useMutation } from "react-query";

const postData = async (props: IGrenadaDonation) => {
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

export const usePostGrenadaDonation = () => {
  return useMutation(postData);
};
