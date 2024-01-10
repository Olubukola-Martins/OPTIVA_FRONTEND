import { useGetToken } from "src/hooks/useGetToken";
import { END_POINT } from "src/config/environment";
import axios from "axios";
import { useMutation } from "react-query";
import { IGrenadaRealEstate } from "../types/postTypes";

const postData = async (props: IGrenadaRealEstate) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/fee`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ...props,
  };
  const response = await axios.post(url, data, config);
    return response;
};

export const usePostGrenadaRealEstate = () => {
  return useMutation(postData);
};
