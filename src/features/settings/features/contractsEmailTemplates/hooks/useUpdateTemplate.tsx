import axios from "axios";
import { useMutation } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";

export const QUERY_KEY_EMAIL_TEMPLATES = "EmailContractTemplates";
export const emailContractTemplatesURL = `${END_POINT.BASE_URL}/admin/email-templates`;
export const editEmailContractTemplatesURL = `${END_POINT.BASE_URL}/admin/update-template`;
export interface IPropData {
  content: string;
  name: string;
  type: string;
  file?: string
}

const editTemplatemData = async(newData: IPropData) => {
  const token = useGetToken();
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    editEmailContractTemplatesURL,
    newData,
    config
  );

  return response;
};

const useUpdateTemplate = () => {
  return useMutation(editTemplatemData);
};

export default useUpdateTemplate;
