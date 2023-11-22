import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { branchProps } from "../types";

const UserRequest = async (props: branchProps) => {
  const updateUrl = `/admin/branches/${props.id}`;
  const addUrl = "/admin/branches";
  const acceptedUrl = props.id ? updateUrl : addUrl;
  const url = `${END_POINT.BASE_URL}${acceptedUrl}`;

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
  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};

export const useCreateAndUpdateBranch = () => {
  return useMutation(UserRequest);
};
