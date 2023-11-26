import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IPostApplication } from "../types";
import { useMutation } from "react-query";

const postRequest = async (props: IPostApplication) => {
  const url = `${END_POINT.BASE_URL}/admin/investment-route`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const body = {
    section_title: props.section_title,
    form_questions: props.form_questions,
    section_description: props.section_description,
    subsections: props.subsections,
  };

  const res = await axios.post(url, body, config);
  return res;
};

export const usePostApplicationTemplate = () => {
    return useMutation(postRequest);
};
