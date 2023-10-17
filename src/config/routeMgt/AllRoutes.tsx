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
import Comments from "src/features/applications/pages/Comments";

import { RequireAuth } from "react-auth-kit";

const routesArray = [
  {
    path: appRoute.home,
    element: <Dashboard />,
  },
  { path: appRoute.dependents, element: <Dependents /> },
  { path: appRoute.settings, element: <Settings /> },
  { path: appRoute.applications, element: <Applications /> },
  { path: appRoute.applicant_details().format, element: <ApplicantDetails /> },
];

export const AllRoutes = () => {
  return (
 
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          {routesArray.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.path === appRoute.login_in ? (
                  route.element
                ) : (
                  <RequireAuth loginPath={appRoute.login_in}>
                    {route.element}
                  </RequireAuth>
                )
              }
            />
          ))}
        </Route>
        <Route path={appRoute.login_in} element={<Login />} />
      </Routes>
    </Router>
  );
};
