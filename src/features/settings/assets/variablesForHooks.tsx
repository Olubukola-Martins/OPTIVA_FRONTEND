import axios from "axios";
// import { ICurrentCompany } from "types";


interface IPostProps extends ICurrentCompany {
  newData: any;
  url: string;
}
interface IEditProps extends ICurrentCompany {
  newData: any;
  url: string;
}

export const postItemData = async ({ newData, url }: IPostProps) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId,
    },
  };

  const response = await axios.post(url, newData, config);
  return response;
};

export const editItemData = async (props: IEditProps) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.put(props.url, props.newData, config);
  return response;
};
