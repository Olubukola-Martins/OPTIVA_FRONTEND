import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { employeesProps } from "../types";

const UserRequest = async (props: employeesProps) => {
  const token = useGetToken();
  const updateUrl = `/admin/employees/${props.id}`;
  const addUrl = "/admin/employees";
  const acceptedUrl = props.id ? updateUrl : addUrl;
  const url = `${END_POINT.BASE_URL}${acceptedUrl}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    name: props.name,
    email: props.email,
    department_id: props.department_id,
    roles: [props.roles],
    branches: props.branches,
  };
  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};

export const useCreateAndUpdateEmployee = () => {
  return useMutation(UserRequest);
};
