import { useMutation } from "react-query";
import { editItemData } from "src/features/settings/utils/settingsAPIHelpers";

const useUpdatePaymentDetail = () => {
  return useMutation(editItemData);
}

export default useUpdatePaymentDetail