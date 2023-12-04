

import { useMutation } from "react-query";
import { postItemData } from "src/features/settings/utils/settingsAPIHelpers";

// export const QUERY_KEY_EMAIL_TEMPLATES = "EmailContractTemplates";
// export const emailContractTemplatesURL = `${END_POINT.BASE_URL}/admin/email-templates`;
// export const editEmailContractTemplatesURL = `${END_POINT.BASE_URL}/admin/update-template`;

// const addMeeting = async (newData: INewMeeting) => {
//   const token = useGetToken();
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.post(
//     meetingsURL,
//     newData,
//     config
//   );

//   return response;
// };

const useAddMeeting = () => {
  return useMutation(postItemData);
};

export default useAddMeeting;
