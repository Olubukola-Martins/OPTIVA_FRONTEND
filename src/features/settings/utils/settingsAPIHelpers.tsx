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
  id: number
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

export const editItemData = async ({ newData, id, url, token }: IEditProps) => {
  const editUrl = `${url}/${id}`
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(editUrl, newData, config);
  
  return response;
};
