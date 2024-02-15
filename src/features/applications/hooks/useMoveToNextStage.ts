import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IMoveToNextStage } from "../types/types";

const postData = async (props: IMoveToNextStage) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/application/${props.milestone_id}/change/stage`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(url, null, config);
  return response;
};

export const useMoveToNextStage = () => {
  return useMutation(postData);
};
