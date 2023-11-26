import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

interface IPutProgramType extends IUserToken {
  program_name: string;
  //   country_id: number;
  program_link: string;
  document_requirements: number[];
  template_id: number;
  workflow_id: number;
  milestones: number[];
  eligible_dependants: number[];
  id: number;
}

interface IPProps {
  queryKey: string;
}

const handlePutData = async (props: IPutProgramType) => {
  const url = `${END_POINT.BASE_URL}/admin/countries/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data: any = {
    program_name: props.program_name,
    program_link: props.program_link,
    // country_id: props.country_id,
    eligible_dependants: props.eligible_dependants,
    template_id: props.template_id,
    milestones: props.milestones,
    workflow_id: props.workflow_id,
    document_requirements: props.document_requirements,
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateProgramType = ({ queryKey }: IPProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handlePutData);

  const putData = (
    id: number,
    program_name: string,
    // country_id: number,
    program_link: string,
    document_requirements: number[],
    template_id: number,
    workflow_id: number,
    milestones: number[],
    eligible_dependants: number[]
  ) => {
    mutate(
      {
        id,
        // country_id,
        document_requirements,
        eligible_dependants,
        milestones,
        program_link,
        program_name,
        template_id,
        token,
        workflow_id,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { putData, isLoading };
};
