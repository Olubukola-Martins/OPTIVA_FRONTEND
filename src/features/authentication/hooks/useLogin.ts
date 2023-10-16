import axios from "axios";
import { END_POINT } from "src/config/environment";
import { loginProps } from "../types";
import { useMutation } from "react-query";

export const setCSRFToken = async () => {
  try {
    const response = await axios.get(
      `https://optiva-backend.techmur.com/sanctum/csrf-cookie`
    );
    return response;
  } catch (err) {
    console.log(err);

    return err;
  }
};

const loginUser = async (props: loginProps) => {
  const url = `${END_POINT.BASE_URL}/login`;
  const data = { ...props };
  // await setCSRFToken();
  const response = await axios.post(url, data);
  return response;
};

export const useLogin = () => {
  return useMutation(loginUser);
};
