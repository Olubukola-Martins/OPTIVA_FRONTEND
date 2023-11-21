import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { branchProps } from "../types";

const UserRequest = async (props: branchProps) => {
  const url = `${END_POINT.BASE_URL}/admin/branches`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data = {
    name: props.name,
    email: props.email,
    address_details: props.address_details,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateBranch = () => {
  return useMutation(UserRequest);
};
