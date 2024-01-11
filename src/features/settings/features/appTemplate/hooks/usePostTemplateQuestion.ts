import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IAppTemplateQuestions } from "../types";
import { useMutation } from "react-query";


const postData = async (props: IAppTemplateQuestions, section: string) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/${section}`;

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

export const usePostSectionOneQuestion = (section: string) => {
  return useMutation((props: IAppTemplateQuestions) =>
    postData(props, section)
  );
};
