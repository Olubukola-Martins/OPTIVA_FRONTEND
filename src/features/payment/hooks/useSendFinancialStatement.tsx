import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FINANCIAL_STATEMENT } from "./useGenerate";

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
  

export const useSendFinancialStatement = ({
    itemId,
    onSuccessAction,
  }: {
    itemId: number;
    onSuccessAction?: any;
  }) => {
    const queryData = useQuery(
      [QUERY_KEY_FINANCIAL_STATEMENT, itemId],
      () => {
        getData({
          itemId,
          urlEndPoint: `${END_POINT.BASE_URL}/admin/financial-statement`,
        });
      },
      {
        enabled: !!itemId,
        onError: () => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: "",
            duration: 5,
          });
        },
        onSuccess: () => {
          openNotification({
            state: "success",
            title: "Success",
            description: "Financial statement sent succesfully",
            duration: 5,
          });
  
          onSuccessAction;
        },
      }
    );
    return queryData;
  };
  
