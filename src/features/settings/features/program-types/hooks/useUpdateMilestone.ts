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
    const { id, token, processes, ...rest } = props;
    const url = `${END_POINT.BASE_URL}/admin/milestone/${id}`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const res = await axios.post(url, { ...rest, processes }, config);
    return res;
  };
  
  export const useUpdateMilestone = ({ queryKey }: IPProps) => {
    const queryClient = useQueryClient();
    const { token } = useGetUserInfo();
    const { mutate, isLoading } = useMutation(handlePutData);
  
    const putData = (data: Omit<IPostMilestone, 'token'>) => {
      const { processes, ...rest } = data;
      const { title, duration, duration_type } = processes[0];
  
      mutate(
        {
          token,
          processes: [{ title, duration, duration_type }],
          ...rest,
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
  