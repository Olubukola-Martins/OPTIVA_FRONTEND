import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { workflowProps } from "../types";
 
const UserRequest = async (props: workflowProps) => {
  const token = useGetToken();
  const updateUrl = `/admin/workflow/${props.id}`;
  const addUrl = "/admin/workflow";
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
    select_approval: ["review", "accept", "notification", "reject"]
  };
  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};

export const useCreateWorkflow = () => {
  return useMutation(UserRequest);
};
