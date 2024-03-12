import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";

const postData = async (props: { id: number }) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/send-quote/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};

export const useSendQuote = () => {
  return useMutation(postData);
};
