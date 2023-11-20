import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { forgotPasswordProps } from "../types";

const UserRequest = async (props: forgotPasswordProps) => {
  const url = `${END_POINT.BASE_URL}/password-reset`;
  const data = { ...props };
  const response = await axios.post(url, data);
  return response;
};

export const useForgotPassword = () => {
  return useMutation(UserRequest);
};
