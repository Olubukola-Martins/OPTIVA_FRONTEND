import axios from "axios";
import { useMutation } from "react-query";
import { IEditProps } from "src/features/settings/utils/settingsAPIHelpers";
import { useGetToken } from "src/hooks/useGetToken";
import { meetingCategoriesUrl } from "../pages/MeetingCategories";


export const editMeetingCategoryData = async ({ newData, id }: IEditProps) => {
  const token = useGetToken();
  const editUrl = `${meetingCategoriesUrl}/${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(editUrl, newData, config);

  return response;
};

const useEditMeetingCategory = () => {
  return useMutation(editMeetingCategoryData);
}

export default useEditMeetingCategory