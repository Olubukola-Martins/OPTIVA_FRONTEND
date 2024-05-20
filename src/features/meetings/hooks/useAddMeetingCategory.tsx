import { useMutation } from "react-query";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";

const useAddMeetingCategory = () => {
  return useMutation(postItemData);
};

export default useAddMeetingCategory;
