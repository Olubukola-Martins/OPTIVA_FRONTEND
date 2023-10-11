import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import Dashboard from "src/features/dashboard/pages/Dashboard";
import Settings from "src/features/settings/pages/Settings";
import { DashboardLayout } from "src/components/layout/Layout";
import Dependents from "src/features/settings/features/dependents/pages/Dependents";
import Applications from "src/features/applications/pages/Applications";
import ApplicantDetails from "src/features/applications/pages/ApplicantDetails";
import ApplicantBrief from "src/features/applications/pages/ApplicantBrief";

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path={appRoute.home} element={<Dashboard />} />
          <Route path={appRoute.dependents} element={<Dependents />} />
          <Route path={appRoute.settings} element={<Settings />} />
            <Route path={appRoute.applications} element={<Applications />} />
          <Route
            path={appRoute.applicantDetails}
            element={<ApplicantDetails />}
          /> 
          <Route path={appRoute.applicantBrief} element={<ApplicantBrief/>}/>
        </Route>
        <Route path={appRoute.login_in} element={<Login />} />
      </Routes>
    </Router>
  );
};
