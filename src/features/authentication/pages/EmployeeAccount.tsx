import logo from "src/assets/logoSvg.svg";
import office from "../assets/0365.svg";
import { Navigate } from "react-router-dom";
import { appRoute } from "src/config/routeMgt/routePaths";
import { useIsAuthenticated } from "react-auth-kit";

const EmployeeAccount = () => {
    const isAuthenticated = useIsAuthenticated();
  return (
    <>
    {isAuthenticated() && <Navigate to={appRoute.home} replace={true} />}

    <div className="Container flex items-center h-screen overflow-y-auto">
      <div className="max-w-md mx-auto bg-[#F5F5F5] px-5 py-7 rounded-md border shadow-sm">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="h-[5rem]" />
        </div>
        <h2 className="font-semibold text-xl pt-3 pb-4 text-accent text-center">
          Reset Password
        </h2>
        {/* <ResetPasswordForm /> */}
        <img
          src={office}
          alt="0365"
          className="cursor-pointer hover:shadow-lg invisible"
        />
      </div>
    </div>
  </>
  )
}

export default EmployeeAccount;