import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import { GlobalContextProvider } from "src/stateManagement/GlobalContext";
import Dashboard from "src/features/dashboard/pages/Dashboard";

export const AllRoutes = () => {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          <Route path={appRoute.home} element={<Dashboard />} />
          <Route path={appRoute.login_in} element={<Login />} />
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
};
