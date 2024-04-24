import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

export interface IPutInvestment extends IUserToken {
  id: number;
  investment_name: string;
  country_id: number;
  programtype_id:number
}

interface IPProps {
  queryKey: string;
}

const handlePutData = async (props: IPutInvestment) => {
  const url = `${END_POINT.BASE_URL}/admin/investment-route/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data: any = {
    investment_name: props.investment_name,
    country_id: props.country_id,
    programtype_id:props.programtype_id
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const usePutInvestmentRoute = ({
  queryKey,
}: IPProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handlePutData);

  const putData = (
    id: number,
    investment_name: string,
    country_id: number,
    programtype_id:number
  ) => {
    mutate(
      {
        token,
        id,
        country_id,
        investment_name,
        programtype_id
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.message,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { putData, isLoading };
};
