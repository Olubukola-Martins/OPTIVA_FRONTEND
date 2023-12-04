import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { IUserToken } from "src/types";

interface IProcesses {
  title: string;
  duration: number;
  duration_type: string;
}
interface IPostMilestone extends IUserToken {
  milestone: string;
  timeline: number;
  duration_type?: string;
  processes: IProcesses[];
}
const postRequest = async (props: IPostMilestone) => {
  const url = `${END_POINT.BASE_URL}/admin/milestone`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      
    },
  };
  const body = {
    milestone: props.milestone,
    timeline: props.timeline,
    duration_type: props.duration_type,
    processes: props.processes,
  };

  const res = await axios.post(url, body, config);
  console.log('post request response', res)
  return res;
};

export const usePostMilestone = () => {
  return useMutation(postRequest);
};
