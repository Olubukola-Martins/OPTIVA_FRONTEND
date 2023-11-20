import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { resetPasswordProps } from "../types";

const UserRequest = async (props: resetPasswordProps) => {
  const url = `${END_POINT.BASE_URL}/reset-password`;
  const data = {
    email: props.email,
    password: props.password,
    password_confirmation: props.password_confirmation,
  };

  const config = {
    headers: {
      Accept: "application/json",
    },
    params: {
      token: props.token,
      email: props.email,
    },
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useResetPassword = () => {
  return useMutation(UserRequest);
};
