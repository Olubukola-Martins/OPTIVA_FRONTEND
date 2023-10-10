import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import { GlobalContextProvider } from "src/stateManagement/GlobalContext";
import Dashboard from "src/features/dashboard/pages/Dashboard";
import Settings from "src/features/settings/pages/Settings";
import Dependents from "src/features/settings/features/delegation/pages/Dependents";
import { DashboardLayout } from "src/components/layout/Layout";

export const AllRoutes = () => {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path={appRoute.home} element={<Dashboard />} />
            <Route path={appRoute.dependents} element={<Dependents />} />
            <Route path={appRoute.settings} element={<Settings />} />
          </Route>
          <Route path={appRoute.login_in} element={<Login />} />
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
};
