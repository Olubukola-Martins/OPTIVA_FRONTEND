import { useMutation } from "react-query";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";

const useAddMeeting = () => {
  return useMutation(editItemData);
};

export default useAddMeeting;
