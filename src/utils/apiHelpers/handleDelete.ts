import axios from "axios";
import { END_POINT } from "src/config/environment";
import { IGeneralProps } from "src/types";

export const handleDelete = async ({
  id,
  token,
  deleteEndPointUrl,
}: IGeneralProps) => {
  const url = `${END_POINT.BASE_URL}/${deleteEndPointUrl}${id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
