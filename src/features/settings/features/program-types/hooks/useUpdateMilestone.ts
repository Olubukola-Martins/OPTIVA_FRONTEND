import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

interface IProcesses {
  title: string;
  duration: number;
  duration_type: string;
}

interface IPostMilestone extends IUserToken {
  id: number;
  milestone: string;
  timeline: number;
  duration_type: string;
  processes: IProcesses[];
}

interface IPProps {
  queryKey: string;
}

const handlePutData = async (props: IPostMilestone) => {
  const url = `${END_POINT.BASE_URL}/admin/milestone/${props.id}`;
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
    processes: props.processes.map((process) => ({
      title: process.title,
      duration: process.duration,
      duration_type: process.duration_type,
    })),
  };

  const res = await axios.put(url, body, config);
  return res;
};

export const useUpdateMilestone = ({ queryKey }: IPProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handlePutData);

  const putData = (
    id: number,
    milestone: string,
    timeline: number,
    duration_type: string,
    processes: IProcesses[]
  ) => {


    mutate(
      {
        duration_type,
        id,
        milestone,
        processes,
        timeline,
         token
      
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };

  return { putData, isLoading };
};
