import { useAuthUser } from "react-auth-kit";

export const useGetUserInfo = () => {
  const auth = useAuthUser();
  const userDetails = auth();
  const userInfo = userDetails?.user;
  const token = userDetails?.token;
  return { userInfo, token };
};
