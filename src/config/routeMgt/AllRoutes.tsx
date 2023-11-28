import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { appRoute } from "./routePaths";
import Login from "src/features/authentication/pages/Login";
import Dashboard from "src/features/dashboard/pages/Dashboard";
import Settings from "src/features/settings/pages/Settings";
import { DashboardLayout } from "src/components/layout/Layout";
import Dependents from "src/features/settings/features/dependents/pages/Dependents";
import Applications from "src/features/applications/pages/Applications";
import ApplicantDetails from "src/features/applications/pages/ApplicantDetails";
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
import Meetings from "src/features/meetings/pages/Meetings";
import { RequireAuth } from "react-auth-kit";
import NewApplication from "src/features/applications/pages/NewApplication";
import ApplicantDocument from "src/features/applications/pages/ApplicantDocument";
import DocumentRequirements from "src/features/settings/features/documents/pages/DocumentRequirements";
import ApplicationTemplate from "src/features/settings/features/appTemplate/pages/ApplicationTemplate";
import NewApplicationTemplate from "src/features/settings/features/appTemplate/pages/NewApplicationTemplate";
import CountryMilestonesAndPrograms from "src/features/settings/features/program-types/pages/CountryMilestonesAndPrograms";
import CreateProgramType from "src/features/settings/features/program-types/pages/CreateProgramType";
import DefineFeesAndAuthorizedPersons from "src/features/settings/features/authorizedPersons/pages/DefineFeesAndAuthorizedPersons";
import { AddFees } from "src/features/settings/features/authorizedPersons/pages/AddFees";
import InvestmentRoute from "src/features/settings/features/investment/pages/InvestmentRoute";
import Escalation from "src/features/settings/features/escalation/pages/Escalation";
import NewEscalation from "src/features/settings/features/escalation/pages/NewEscalation";
import EditEscalation from "src/features/settings/features/escalation/pages/EditEscalation";
import AllContractsEmailTemplates from "src/features/settings/features/contractsEmailTemplates/pages/AllContractsEmailTemplates";
import ContractTemplate from "src/features/settings/features/contractsEmailTemplates/pages/ContractTemplate";
import OnboardingWelcomeEmailTemplate from "src/features/settings/features/contractsEmailTemplates/pages/OnboardingWelcomeEmailTemplate";
import CollationAppointConfirmationTemplate from "src/features/settings/features/contractsEmailTemplates/pages/CollationAppointConfirmationTemplate";
import CBIBankDDClearanceTemplate from "src/features/settings/features/contractsEmailTemplates/pages/CBIBankDDClearanceTemplate";
import CBIBankAppECopyPassportReceiptTemp from "src/features/settings/features/contractsEmailTemplates/pages/CBIBankAppECopyPassportReceiptTemp";
import CBIBankAppApprovalTemplate from "src/features/settings/features/contractsEmailTemplates/pages/CBIBankAppApprovalTemplate";
import CBIAppSubmissionTemplate from "src/features/settings/features/contractsEmailTemplates/pages/CBIAppSubmissionTemplate";
import ForgotPassword from "src/features/authentication/pages/ForgotPassword";
import ResetPassword from "src/features/authentication/pages/ResetPassword";
import { GlobalContextProvider } from "src/stateManagement/GlobalContext";
import Department from "src/features/settings/features/department/pages/Department";
import Employees from "src/features/settings/features/employees/pages/Employees";
import Branches from "src/features/settings/features/branch/pages/Branches";
import Roles from "src/features/settings/features/rolesAndPermissions/pages/Roles";
import CompanyProfile from "src/features/settings/features/companyProfile/page/CompanyProfile";

const routesArray = [
  {
    path: appRoute.home,
    element: <Dashboard />,
  },
  { path: appRoute.dependents, element: <Dependents /> },
  { path: appRoute.settings, element: <Settings /> },
  { path: appRoute.escalation, element: <Escalation /> },
  { path: appRoute.defineEscalation, element: <NewEscalation /> },
  { path: appRoute.editEscalation().format, element: <EditEscalation /> },
  {
    path: appRoute.contractsEmailTemplates,
    element: <AllContractsEmailTemplates />,
  },
  { path: appRoute.contractsTemplate, element: <ContractTemplate /> },
  {
    path: appRoute.onboardingWelcomeTempl,
    element: <OnboardingWelcomeEmailTemplate />,
  },
  {
    path: appRoute.collationAppointmentConfirmTempl,
    element: <CollationAppointConfirmationTemplate />,
  },
  {
    path: appRoute.cbiBankDDclearance,
    element: <CBIBankDDClearanceTemplate />,
  },
  {
    path: appRoute.cbiBAsoftPassportReceipt,
    element: <CBIBankAppECopyPassportReceiptTemp />,
  },
  {
    path: appRoute.cbiBAapprovalMailTemp,
    element: <CBIBankAppApprovalTemplate />,
  },
  {
    path: appRoute.cbiApplicationSubmissionMailTemp,
    element: <CBIAppSubmissionTemplate />,
  },
  { path: appRoute.applications, element: <Applications /> },
  { path: appRoute.applicantDetails, element: <ApplicantDetails /> },
  { path: appRoute.meetings, element: <Meetings /> },
  { path: appRoute.payments, element: <Payments /> },
  { path: appRoute.paymentDetails().format, element: <PaymentDetails /> },
  { path: appRoute.generateReciept().format, element: <GenerateReceipt /> },
  { path: appRoute.generateInvoice().format, element: <GenerateInvoice /> },
  {
    path: appRoute.financialStatement().format,
    element: <GenerateFinancialStatement />,
  },
  { path: appRoute.generateContract().format, element: <GenerateContract /> },
  { path: appRoute.reports, element: <Reports /> },
  { path: appRoute.applicant_details().format, element: <ApplicantDetails /> },

  {
    path: appRoute.timeline_extensions().format,
    element: <TimelineExtensions />,
  },
  {
    path: appRoute.processing_strategy_steps().format,
    element: <ProcessingStrategyAndSteps />,
  },
  { path: appRoute.comments().format, element: <Comments /> },
  { path: appRoute.new_application, element: <NewApplication /> },
  {
    path: appRoute.applicant_documents().format,
    element: <ApplicantDocument />,
  },
  {
    path: appRoute.documentRequirements,
    element: <DocumentRequirements />,
  },
  {
    path: appRoute.applicationTemplate,
    element: <ApplicationTemplate />,
  },
  {
    path: appRoute.newApplicationTemplate,
    element: <NewApplicationTemplate />,
  },
  {
    path: appRoute.countryMilestonesProgram,
    element: <CountryMilestonesAndPrograms />,
  },
  {
    path: appRoute.createProgramType,
    element: <CreateProgramType />,
  },
  {
    path: appRoute.defineFeesAndAuthorizedPersons,
    element: <DefineFeesAndAuthorizedPersons />,
  },
  {
    path: appRoute.addFees,
    element: <AddFees />,
  },

  { path: appRoute.document_requirement, element: <DocumentRequirements /> },
  { path: appRoute.investment_route, element: <InvestmentRoute /> },
  { path: appRoute.app_template, element: <ApplicationTemplate /> },
  { path: appRoute.department, element: <Department /> },
  { path: appRoute.employees, element: <Employees /> },
  { path: appRoute.branches, element: <Branches /> },
  { path: appRoute.roles, element: <Roles /> },
  { path: appRoute.companyProfile, element: <CompanyProfile /> },
];

export const AllRoutes = () => {
  return (
    <Router>
      <GlobalContextProvider>
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
          <Route path={appRoute.forgot_password} element={<ForgotPassword />} />
          <Route path={appRoute.reset_password} element={<ResetPassword />} />
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
};
