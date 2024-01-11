import { useMutation } from 'react-query';
import { postItemData } from 'src/features/settings/utils/settingsAPIHelpers';

const useAddPaymentDetail = () => {
  return useMutation(postItemData);
}

export default useAddPaymentDetail

