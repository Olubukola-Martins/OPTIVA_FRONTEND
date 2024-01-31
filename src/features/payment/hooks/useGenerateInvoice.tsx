import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_INVOICES } from "../pages/Payments";

interface IGenInvoiceBody {
  description: string;
  quantity: number;
  amount_in_naira: number;
  amount: number;
  fx_rate: string;
}
const useGenerateInvoice = () => {
    const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(postItemData);
  const generateInvoice = (newData: IGenInvoiceBody, applicationID: number) => {
    mutate(
      {
        url: `${END_POINT.BASE_URL}/admin/invoice/${applicationID}`,
        newData,
      },
      {
        onError: (error:any) => {
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
            queryClient.invalidateQueries([QUERY_KEY_INVOICES]);
        },
      }
    );
  };
  return {
    generateInvoice,
    generateInvoiceLoading: isLoading,
  };
};

export default useGenerateInvoice;
