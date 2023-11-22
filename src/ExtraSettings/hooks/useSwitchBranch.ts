import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";

const UserRequest = async (branch_id: number) => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/current-branch`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    branch_id: branch_id,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useSwitchBranch = () => {
  return useMutation(UserRequest);
};
