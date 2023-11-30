import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { companyProfileProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

const UserRequest = async (props: companyProfileProps) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/company-profile`;
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

export const useUpdateCompanyProfile = () => {
  return useMutation(UserRequest);
};
