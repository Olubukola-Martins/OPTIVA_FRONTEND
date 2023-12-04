import axios from "axios";
import { useGetToken } from "src/hooks/useGetToken";


interface IPostProps  {
  newData: any;
  url: string;
}
interface IEditProps {
  newData: any;
  url: string;
  id: number
}

export const postItemData = async ({ newData, url }: IPostProps) => {
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(url, newData, config);
  return response;
};

export const editItemData = async ({ newData, id, url }: IEditProps) => {
    const token = useGetToken();
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
