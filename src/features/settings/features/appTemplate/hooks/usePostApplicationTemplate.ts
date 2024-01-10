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
    sections: props.sections,
    template_description: props.template_description,
    template_name: props.template_name,
  };

  const res = await axios.post(url, body, config);
  return res;
};

export const usePostApplicationTemplate = () => {
  return useMutation(postRequest);
};
