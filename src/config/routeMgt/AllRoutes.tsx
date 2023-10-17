import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import Dashboard from "src/features/dashboard/pages/Dashboard";
import Settings from "src/features/settings/pages/Settings";
import { DashboardLayout } from "src/components/layout/Layout";
import Dependents from "src/features/settings/features/dependents/pages/Dependents";
import Applications from "src/features/applications/pages/Applications";
import ApplicantDetails from "src/features/applications/pages/ApplicantDetails";
import TimelineExtensions from "src/features/applications/pages/TimelineExtensions";
import ProcessingStrategyAndSteps from "src/features/applications/pages/ProcessingStrategyAndSteps";
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
            path={appRoute.applicant_details().format}
            element={<ApplicantDetails />}
          />
          <Route
            path={appRoute.timeline_extensions}
            element={<TimelineExtensions />}
          />
        </Route>
        <Route
          path={appRoute.processing_strategy_steps}
          element={<ProcessingStrategyAndSteps />}
        />
        <Route path={appRoute.login_in} element={<Login />} />
      </Routes>
    </Router>
  );
};
