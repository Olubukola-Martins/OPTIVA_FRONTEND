import axios from "axios";
import { IUserToken } from "src/types";
// import { ICurrentCompany } from "types";


interface IPostProps extends IUserToken {
  newData: any;
  url: string;
}
interface IEditProps extends IUserToken {
  newData: any;
  url: string;
}

export const postItemData = async ({ newData, url ,token}: IPostProps) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, newData, config);
  return response;
};

export const editItemData = async ({ newData, url, token }: IEditProps) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(url, newData, config);
  return response;
};
