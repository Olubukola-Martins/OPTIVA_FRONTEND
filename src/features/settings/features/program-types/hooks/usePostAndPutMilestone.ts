import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IUserToken } from "src/types";

interface IProcesses {
  title: string;
  duration: number;
  duration_type: string;
}
interface IPostMilestone extends IUserToken {
  id: number;
  milestone: string;
  timeline: number;
  duration_type?: string;
  processes: IProcesses[];
}
const postRequest = async (props: IPostMilestone) => {
  const { token } = useGetToken();
  const updateUrl = `/admin/milestone/${props.id}`;
  const addUrl = "/admin/milestone";
  const acceptedUrl = props.id ? updateUrl : addUrl;
  const url = `${END_POINT.BASE_URL}${acceptedUrl}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    ...props,
  };;

  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, body, config);
  return response;
};

export const usePostAndPutMilestone = () => {
  return useMutation(postRequest);
};
