import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_INVOICES } from "../pages/Payments";
import { useNavigate } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";

export const QUERY_KEY_RECEIPT = "Receipt";
export const QUERY_KEY_FINANCIAL_STATEMENT = "FinancialStatement";

const getData = async (props: { itemId: number; urlEndPoint: string }) => {
  const url = `${props.urlEndPoint}/${props.itemId}`;
  const token = useGetToken();

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data;
  return item;
};

export const generateReceipt = ({ itemId }: { itemId: number }) => {
  const navigate = useNavigate();
  const queryData = useQuery(
    [QUERY_KEY_RECEIPT, itemId],
    async () => {
      return getData({
        itemId,
        urlEndPoint: `${END_POINT.BASE_URL}/admin/receipt`,
      });
    },
    {
      enabled: !!itemId,
      onError: () => {
        navigate(appRoute.payments);
        openNotification({
          state: "error",
          title: "Error Occured",
          description: "",
          duration: 5,
        });
      },
      onSuccess: () => {
        // openNotification({
        //   state: "success",
        //   title: "Success",
        //   description: res.message,
        //   duration: 5,
        // });
      },
    }
  );
  return queryData;
};

export const viewInvoice = ({ itemId }: { itemId: number }) => {
  const navigate = useNavigate();

  const queryData = useQuery(
    [QUERY_KEY_INVOICES, itemId],
    async () => {
      return getData({
        itemId,
        urlEndPoint: `${END_POINT.BASE_URL}/admin/invoice`,
      });
    },
    {
      enabled: !!itemId,
      onError: () => {
        navigate(appRoute.payments);

        openNotification({
          state: "error",
          title: "Error Occured",
          description: "",
          duration: 5,
        });
      },
      onSuccess: () => {
        // openNotification({
        //   state: "success",
        //   title: "Success",
        //   description: "",
        //   duration: 5,
        // });
      },
    }
  );
  return queryData;
};

export const generateFinancialStatement = ({ itemId }: { itemId: number }) => {
  const navigate = useNavigate();

  const queryData = useQuery(
    [QUERY_KEY_FINANCIAL_STATEMENT, itemId],
    async () => {
      return getData({
        itemId,
        urlEndPoint: `${END_POINT.BASE_URL}/admin/financial-statement`,
      });
    },
    {
      enabled: !!itemId,
      onError: () => {
        navigate(appRoute.payments);

        openNotification({
          state: "error",
          title: "Error Occured",
          description: "",
          duration: 5,
        });
      },
      onSuccess: (res) => {
        console.log("fs",res)
        // openNotification({
        //   state: "success",
        //   title: "Success",
        //   description: "",
        //   duration: 5,
        // });
      },
    }
  );
  return queryData;
};
