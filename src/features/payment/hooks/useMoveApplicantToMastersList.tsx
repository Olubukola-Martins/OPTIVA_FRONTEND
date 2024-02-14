import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";

export const QUERY_KEY_MASTERlIST = "MasterList";

const postMasterListData = async ({ url }: { url: string }) => {
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, {},config);
  return response;
};

const useMoveApplicantToMastersList = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postMasterListData);
  const moveToMasterList = (applicantId: number) => {
    mutate(
      { url: `${END_POINT.BASE_URL}/admin/move-to-masterlist/${applicantId}` },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (response: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: response.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_MASTERlIST, applicantId]);
        },
      }
    );
  };
  return {
    moveToMasterList,
    moveToMasterLoading: isLoading,
  };
};

export default useMoveApplicantToMastersList;
