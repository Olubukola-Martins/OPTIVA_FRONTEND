import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { IUserToken } from "src/types";

interface IPostData extends IUserToken {
  signature: string;
  employee_id: number
}

const postData = async (props: IPostData) => {
  const url = `${END_POINT.BASE_URL}/admin/authorized-person`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const body = {
    signature: props.signature,
    employee_id:props.employee_id
  };

  const res = await axios.post(url, body, config);
  return res;
};

export const usePostAuthorizedPersons = () => {
  return useMutation(postData);
};
