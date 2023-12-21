import { useMutation } from "react-query";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
const useRespondToMeeting = () => {
  const {
    mutate,
    isLoading: responseLoading,
  } = useMutation(postItemData);
  return { mutate, responseLoading };
};

export default useRespondToMeeting;
