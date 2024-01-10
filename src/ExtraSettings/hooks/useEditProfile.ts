import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { editProfileProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

const UserRequest = async (props: editProfileProps) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/update-profile`;
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

export const useEditProfile = () => {
  return useMutation(UserRequest);
};
