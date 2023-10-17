import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import Dashboard from "src/features/dashboard/pages/Dashboard";
import Settings from "src/features/settings/pages/Settings";
import { DashboardLayout } from "src/components/layout/Layout";
import Dependents from "src/features/settings/features/dependents/pages/Dependents";
import Applications from "src/features/applications/pages/Applications";
import ApplicantDetails from "src/features/applications/pages/ApplicantDetails";
import { ApplicantBrief } from "src/features/applications/components/ApplicantBrief";
import Payments from "src/features/payment/pages/Payments";
import PaymentDetails from "src/features/payment/pages/PaymentDetails";
import GenerateReceipt from "src/features/payment/pages/GenerateReceipt";
import GenerateInvoice from "src/features/payment/pages/GenerateInvoice";
import GenerateFinancialStatement from "src/features/payment/pages/GenerateFinancialStatement";
import GenerateContract from "src/features/payment/pages/GenerateContract";
import Reports from "src/features/report/pages/Reports";
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
  { path: appRoute.applicantDetails, element: <ApplicantDetails /> },
  { path: appRoute.applicantBrief, element: <ApplicantBrief /> },
  { path: appRoute.payments, element: <Payments /> },
  { path: appRoute.paymentDetails().format, element: <PaymentDetails /> },
  { path: appRoute.generateReciept().format, element: <GenerateReceipt /> },
  { path: appRoute.generateInvoice().format, element: <GenerateInvoice /> },
  { path: appRoute.financialStatement().format, element: <GenerateFinancialStatement /> },
  { path: appRoute.generateContract().format, element: <GenerateContract /> },
  { path: appRoute.reports, element: <Reports /> },
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
