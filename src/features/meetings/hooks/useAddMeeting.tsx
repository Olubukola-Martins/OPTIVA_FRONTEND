

import { useMutation } from "react-query";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";


const useAddMeeting = () => {
  return useMutation(postItemData);
};

export default useAddMeeting;
