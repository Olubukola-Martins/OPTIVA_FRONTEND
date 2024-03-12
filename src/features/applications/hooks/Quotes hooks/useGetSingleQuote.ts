// import axios from "axios";
// import { useQuery } from "react-query";
// import { END_POINT } from "src/config/environment";
// import { useGetToken } from "src/hooks/useGetToken";
// import { IGetDominicaQuote } from "../../types/types";
// import { QUERY_KEY_QUOTES } from "src/features/payment/pages/Payments";

// const getData = async (props: { id: number }): Promise<IGetDominicaQuote> => {
//   const token = useGetToken();

//   const url = `${END_POINT.BASE_URL}/admin/view-quote-breakdown/${props.id}`;
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const res = await axios.get(url, config);
//     const item = res.data.data;
//     const data: IGetDominicaQuote = { ...item };
//     return data
// };

// export const useGetSingleQuote = (props: { id: number }) => {
//   const queryData = useQuery([QUERY_KEY_QUOTES], () => getData(props), {
//     onError: () => {},
//     onSuccess: () => {},
//   });

//   return queryData;
// };

import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { QUERY_KEY_QUOTES } from "src/features/payment/pages/Payments";

// Define a generic type parameter T that extends an interface
const getData = async <T>(props: { id: number }): Promise<T> => {
  const token = useGetToken();

  const url = `${END_POINT.BASE_URL}/admin/view-quote-breakdown/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data; // Asserting the response data as type T
  const data: T = { ...item };
  return data;
};

export const useGetSingleQuote = <T>(props: { id: number }) => {
  const queryData = useQuery([QUERY_KEY_QUOTES], () => getData<T>(props), {
    onError: () => {},
    onSuccess: () => {},
  });

  return queryData;
};
