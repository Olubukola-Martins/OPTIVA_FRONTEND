import axios from "axios";
import { END_POINT } from "src/config/environment";

const useGetData = async (props: { token: string }) => {
  const url = `${END_POINT.BASE_URL}/admin/authorized-person`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  console.log('authorized persons:', res)

};

export const useGetAutohorisedPersons = () => {
  
  return;
};
