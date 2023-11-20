import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { changePasswordProps } from "../types";

const UserRequest = async (props: changePasswordProps) => {
  const url = `${END_POINT.BASE_URL}/change-password`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data = {
    old: props.old,
    password: props.password,
    password_confirmation: props.password_confirmation,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useChangePassword = () => {
  return useMutation(UserRequest);
};
