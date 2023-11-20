import { useAuthUser } from "react-auth-kit";
import { useGlobalContext } from "src/stateManagement/GlobalContext";

export const useGetUserInfo = () => {
  const { branchId } = useGlobalContext();
  const auth = useAuthUser();
  const userDetails = auth();
  const userInfo = userDetails?.user;
  const token = userDetails?.token;
  return { userInfo, token, branchId };
};
