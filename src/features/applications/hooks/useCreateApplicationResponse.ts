import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { ICreateApplicationResponse } from "../types/types";

const postData = async (props: ICreateApplicationResponse, section: string) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/application/${section}`;

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

export const useCreateApplicationResponse = (section: string) => {
  return useMutation((props: ICreateApplicationResponse) =>
    postData(props, section)
  );
};
