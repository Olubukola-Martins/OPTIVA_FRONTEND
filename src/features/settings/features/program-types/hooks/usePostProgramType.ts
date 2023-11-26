import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { IUserToken } from "src/types";

interface IProgram extends IUserToken {
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  milestones: number[];
  eligible_dependants: number[];
  document_requirements: number[];
}
const postRequest = async (props: IProgram) => {
  const url = `${END_POINT.BASE_URL}/admin/programtypes`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const body = {
    program_name: props.program_name,
    program_link: props.program_link,
    template_id: props.template_id,
    workflow_id: props.workflow_id,
    milestones: props.milestones,
    eligible_dependants: props.eligible_dependants,
    document_requirements: props.eligible_dependants,
  };

  const res = await axios.post(url, body, config);
  return res;
};

export const usePostProgramType = () => {
  return useMutation(postRequest);
};
