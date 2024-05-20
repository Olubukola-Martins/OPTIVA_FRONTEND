import axios from "axios";
import { END_POINT } from "src/config/environment";
import { useGetToken } from "src/hooks/useGetToken";
import { IUpdateTemplateQuestion } from "../types";
import { useQueryClient, useMutation } from "react-query";
import { openNotification } from "src/utils/notification";
import { QUERY_KEY_FOR_APPLICATION_TEMPLATE } from "./useGetApplicationTemplate";

const patchDataRqst = async (props: IUpdateTemplateQuestion, section:string, id:number) => {
  const token = useGetToken();
  const url = `${END_POINT.BASE_URL}/admin/${section}/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    ...props,
  };
  const response = await axios.patch(url, data, config);
  return response;
};

export const useUpdateQuestions = (section:string, id:number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (props: IUpdateTemplateQuestion) => patchDataRqst(props, section, id)
  );
  const patchData = (
    form_question: string,
    input_type: string,
    template_id: number,
    is_required: boolean
  
  
  ) => {
    mutate(
      {
        form_question,
        input_type,
        is_required,
        template_id,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            duration: 5,
            description: error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([QUERY_KEY_FOR_APPLICATION_TEMPLATE]);
        },
      }
    );
  };
  return { patchData };
};
