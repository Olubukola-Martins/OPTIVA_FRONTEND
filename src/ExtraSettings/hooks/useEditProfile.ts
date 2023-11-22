import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { editProfileProps } from "../types";

const UserRequest = async (props: editProfileProps) => {
  const url = `${END_POINT.BASE_URL}/update-profile`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data = {
      name: props.name,
      phone: props.phone,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useEditProfile = () => {
  return useMutation(UserRequest);
};
