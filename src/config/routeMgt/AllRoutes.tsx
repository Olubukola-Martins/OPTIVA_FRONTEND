import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import { GlobalContextProvider } from "src/stateManagement/GlobalContext";
import Dashboard from "src/features/dashboard/pages/Dashboard";
import Payments from "src/features/payment/pages/Payments";
import PaymentDetails from "src/features/payment/pages/PaymentDetails";

export const AllRoutes = () => {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          <Route path={appRoute.home} element={<Dashboard />} />
          <Route path={appRoute.login_in} element={<Login />} />
          <Route path={appRoute.payments} element={<Payments />} />
          {/* <Route
            path={appRoute.financialStatement().format}
            element={<Payments />}
          />
          <Route
            path={appRoute.generateInvoice().format}
            element={<Payments />}
          />
          <Route
            path={appRoute.generateReciept().format}
            element={<Payments />}
          />*/}
          <Route
            path={appRoute.paymentDetails().format}
            element={<PaymentDetails />}
          />
          {/* <Route path={appRoute.paymentProof().format} element={<Payments />} /> */}
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
};
