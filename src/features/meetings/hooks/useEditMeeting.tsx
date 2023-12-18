import { useMutation } from "react-query";
import { useGetToken } from "src/hooks/useGetToken";
import axios from "axios";
import { IEditProps } from "src/features/settings/utils/settingsAPIHelpers";

export const editMeetingData = async ({ newData, id, url }: IEditProps) => {
  const token = useGetToken();
  const editUrl = `${url}/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(editUrl, newData, config);

  return response;
};


const useEditMeeting = () => {
  return useMutation(editMeetingData);
};

export default useEditMeeting;
