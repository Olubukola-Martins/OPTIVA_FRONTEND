import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";

const handlePatchData = async (props:{application_id: number}) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/application/change/stage`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    application_id:props.application_id,
  };
  const response = await axios.post(url, body, config);
  return response;
};
export const useMoveToNextStage = () => {
  return useMutation(handlePatchData);
};
