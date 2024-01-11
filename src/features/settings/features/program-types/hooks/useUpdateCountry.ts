import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IUserToken } from "src/types";
import { openNotification } from "src/utils/notification";

export interface IPutCountry extends IUserToken {
  id: number;
  country_name: string;
  // programtypes: any[];
}

interface IPProps {
  queryKey: string;
}

const handlePutData = async (props: IPutCountry) => {
  const url = `${END_POINT.BASE_URL}/admin/countries/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const data: any = {
    country_name: props.country_name,
    // programtypes: props.programtypes,
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateCountry = ({ queryKey }: IPProps) => {
  const queryClient = useQueryClient();
  const { token } = useGetUserInfo();
  const { mutate, isLoading } = useMutation(handlePutData);

  const putData = (id: number, country_name: string, ) => {
    mutate(
      {
        country_name,
        token,
        // programtypes,
        id,
      },
      {
        onError: (error: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { putData, isLoading };
};
