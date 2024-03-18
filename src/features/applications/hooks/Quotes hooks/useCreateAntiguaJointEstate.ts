import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IGenerateAntiguaJointRealEstateQuotes } from "../../types/types";

const postData = async (props: IGenerateAntiguaJointRealEstateQuotes) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/generate-quote/${props.id}`;

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

export const useCreateAntiguaJointEstate = () => {
  return useMutation(postData);
};
