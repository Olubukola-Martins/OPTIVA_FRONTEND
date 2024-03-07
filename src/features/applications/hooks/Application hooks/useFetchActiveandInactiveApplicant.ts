import axios from "axios";
import { useQuery } from "react-query";
import { END_POINT } from "src/config/environment";
import { useGetUserInfo } from "src/hooks/useGetUserInfo";
import { IActiveAndInactiveApplications } from "../../types/types";
import { QUERY_KEY_FOR_APPLICATIONS } from "./useGetApplication";

interface IProps {
  section?: string;
  token: string;
}

interface IData {
  section: string;
}

const getData = async (props: IProps) => {
  const url = `${END_POINT.BASE_URL}/admin/${props.section}/applicants`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: IActiveAndInactiveApplications[] = item;
  return data;
};

export const useFetchActiveandInactiveApplicant = ({ section }: IData) => {
  const { token } = useGetUserInfo();
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATIONS, section],
    () => getData({ token, section }),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
