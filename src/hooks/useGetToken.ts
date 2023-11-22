export const useGetToken = () => {
  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("optiva-app_state")
      : null;
  const userInfo = user ? JSON.parse(user) : null;
  return userInfo?.token;
};
