import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { rolesProps } from "../types";
import { useGetToken } from "src/hooks/useGetToken";

const UserRequest = async (props: rolesProps) => {
  const token = useGetToken();
  const updateUrl = `/admin/roles/${props.id}`;
  const addUrl = "/admin/roles";
  const acceptedUrl = props.id ? updateUrl : addUrl;
  const url = `${END_POINT.BASE_URL}${acceptedUrl}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ...props,
  };
  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};

export const useCreateAndUpdateRole = () => {
  return useMutation(UserRequest);
};
