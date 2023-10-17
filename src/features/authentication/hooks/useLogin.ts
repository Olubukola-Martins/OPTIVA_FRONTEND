import axios from "axios";
import { END_POINT } from "src/config/environment";
import { loginProps } from "../types";
import { useMutation } from "react-query";

const loginUser = async (props: loginProps) => {
  const url = `${END_POINT.BASE_URL}/login`;
  const data = { ...props };
  const response = await axios.post(url, data);
  return response;
};

export const useLogin = () => {
  return useMutation(loginUser);
};
