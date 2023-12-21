import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IAntiguaJointRealEstate } from "../types/postTypes";
import { useMutation } from "react-query";

const postData = async (props: IAntiguaJointRealEstate) => {
  const token = useGetToken();
  const putUrl = `/admin/fee/${props.id}`;
  const postUrl = "/admin/fee";
  const requestUrl = props.id ? putUrl : postUrl;

  const url = `${END_POINT.BASE_URL}${requestUrl}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ...props,
  };
  const requestType = props.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};
export const usePostAntiguaJointEstate = () => {
  return useMutation(postData);
};
