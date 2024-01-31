import { useQuery } from "react-query";
import axios from "axios";
import { openNotification } from "src/utils/notification";
import { useGetToken } from "src/hooks/useGetToken";
import { END_POINT } from "src/config/environment";
import { QUERY_KEY_QUOTES } from "../pages/Payments";
import jsPDF from "jspdf";


const convertHtmlToPdf = (htmlContent:  HTMLElement, fileName:string) => {
  const pdf = new jsPDF();
  pdf.html(htmlContent, {
    callback: (pdf) => {
      pdf.save(`${fileName}.pdf`);
    },
  });

};



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


export const useSendQuote = ({
  itemId,
  onSuccessAction,
}: {
  itemId: number;
  onSuccessAction?: any;
}) => {
  const queryData = useQuery(
    [QUERY_KEY_QUOTES, itemId],
    () => {
      getData({
        itemId,
        urlEndPoint: `${END_POINT.BASE_URL}/admin/send-quote`,
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
          description: "Quote sent succesfully",
          duration: 5,
        });

        onSuccessAction;
      },
    }
  );
  return queryData;
};

export const useDownloadQuote = ({
  itemId,
  // onSuccessAction,
}: {
  itemId: number;
  onSuccessAction?: any;
  }) => {
    const queryData = useQuery(
      [QUERY_KEY_QUOTES, itemId],
      () =>
        getData({
          itemId,
          urlEndPoint: `${END_POINT.BASE_URL}/admin/download-quote`,
        }),
      {
        enabled: !!itemId,
        onError: () => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: "",
            // description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res) => {
          console.log("res", res);
                convertHtmlToPdf(res as any, "New Quote");
                openNotification({
                  state: "success",
                  title: "Success",
                  description: "Quote downloaded succesfully",
                  duration: 5,
                });

                // onSuccessAction;
        },
      }
    );

    return queryData;

  // const queryData = useQuery(
  //   [QUERY_KEY_QUOTES, itemId],
  //   () => {
  //     getDownloadQuoteData({
  //       itemId,
  //       urlEndPoint: `${END_POINT.BASE_URL}/admin/download-quote`,
  //     });
  //   },
  //   {
  //     enabled: !!itemId,
  //     onError: () => {
  //       openNotification({
  //         state: "error",
  //         title: "Error Occured",
  //         description: "",
  //         duration: 5,
  //       });
  //     },
  //     onSuccess: (res) => {
  //       console.log("response", res)
  //       // convertHtmlToPdf(res as any, "New Quote");
  //       openNotification({
  //         state: "success",
  //         title: "Success",
  //         description: "Quote downloaded succesfully",
  //         duration: 5,
  //       });

  //       onSuccessAction;
  //     },
  //   }
  // );
  // return queryData;
};
