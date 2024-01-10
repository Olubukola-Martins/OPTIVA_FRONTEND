import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { QUERY_KEY_FOR_TIMELINE_EXTENSIONS } from "./useFetchTimelineExtensions";
import { useQueryClient, useMutation } from "react-query";
import { openNotification } from "src/utils/notification";

const handlePatchData = async (props: {id:number, endpoint:string}) => {
    const token = useGetToken();
    const url = `${END_POINT.BASE_URL}/admin/application/${props.id}/extension/${props.endpoint}`;
  
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
   
    const response = await axios.patch(url, null, config);
    return response;
  };

export const useApproveTimeline = (endpoint: string) => {
    const queryClient = useQueryClient();
  const { mutate } = useMutation(handlePatchData);
    const patchData = (id: number ) => {
        mutate(
          {
                id,
              endpoint
          },
          {
            onError: (error: any) => {
              console.log("error", error);
              openNotification({
                state: "error",
                title: "Error Occured",
                duration: 5,
                description: error.message,
              });
            },
            onSuccess: (res: any) => {
              console.log("response", res);
              openNotification({
                state: "success",
                title: "Success",
                description: res.message,
              });
              queryClient.invalidateQueries([QUERY_KEY_FOR_TIMELINE_EXTENSIONS]);
            },
          }
        );
      };
    return { patchData } 
}
