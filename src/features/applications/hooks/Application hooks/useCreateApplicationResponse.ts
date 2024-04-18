import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { ICreateApplicationResponse } from "../../types/types";

const postData = async (
  props: ICreateApplicationResponse,
  section: string,
  id?: number
) => {
  const token = useGetToken();
  const putUrl = `/admin/application/${id}/ ${section}`;
  const postUrl = `admin/application/${section}`;
  const acceptedUrl = id ? putUrl : postUrl;
  const url = `${END_POINT.BASE_URL}/${acceptedUrl}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ...props,
  };
  const requestType = id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};
export const useCreateApplicationResponse =(section: string) => {
  return useMutation((props: ICreateApplicationResponse, id?: number) =>
    postData(props, section, id)
  );
};

// export const useCreateApplicationResponse = (section: string) => {
//   return useMutation((props: ICreateApplicationResponse) =>
//     postData(props, section)
//   );
// };
