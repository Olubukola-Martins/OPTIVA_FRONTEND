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
import GenerateFinancialStatement from "src/features/payment/pages/GenerateFinancialStatement";
import GenerateContract from "src/features/payment/pages/GenerateContract";
import Reports from "src/features/report/pages/Reports";
import TimelineExtensions from "src/features/applications/pages/TimelineExtensions";
import ProcessingStrategyAndSteps from "src/features/applications/pages/ProcessingStrategyAndSteps";
import Comments from "src/features/applications/pages/Comments";
import Meetings from "src/features/meetings/pages/Meetings";
import { RequireAuth } from "react-auth-kit";
import NewApplication from "src/features/applications/pages/NewApplication";
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
import ForgotPassword from "src/features/authentication/pages/ForgotPassword";
import ResetPassword from "src/features/authentication/pages/ResetPassword";
import { GlobalContextProvider } from "src/stateManagement/GlobalContext";
import Department from "src/features/settings/features/department/pages/Department";
import Employees from "src/features/settings/features/employees/pages/Employees";
import Branches from "src/features/settings/features/branch/pages/Branches";
import Roles from "src/features/settings/features/rolesAndPermissions/pages/Roles";
import CompanyProfile from "src/features/settings/features/companyProfile/page/CompanyProfile";
import SettingsTemplate from "src/features/settings/features/contractsEmailTemplates/pages/SettingsTemplate";
import EditProgramType from "src/features/settings/features/program-types/pages/EditProgramType";
import EditFees from "src/features/settings/features/authorizedPersons/pages/EditFees";
// import ApplicationTemplateDetails from "src/features/settings/features/appTemplate/pages/ApplicationTemplateDetails";
import Workflow from "src/features/settings/features/workFlow/pages/Workflow";
import AddWorkflow from "src/features/settings/features/workFlow/pages/AddWorkflow";
import WorkflowDetails from "src/features/settings/features/workFlow/pages/WorkflowDetails";
import ViewInvoice from "src/features/payment/pages/ViewInvoice";
import ViewQuote from "src/features/payment/pages/ViewQuote";
import { ApplicantDocument } from "src/features/applications/pages/ApplicantDocument";
import { ApplicantDocumentComments } from "src/features/applications/pages/ApplicantDocumentComments";
import { GenerateQuote } from "src/features/applications/pages/GenerateQuote";
import MasterList from "src/features/dashboard/pages/MasterList";
import Prospects from "src/features/dashboard/pages/Prospects";
import AuthorizedApplicants from "src/features/dashboard/pages/AuthorizedApplicants";
import { SendEmail } from "src/features/applications/pages/SendEmail";
import { AttachDocuments} from "src/features/applications/pages/AttachDocuments";
import { SendQuote } from "src/features/applications/pages/SendQuote";
import MeetingCategories from "src/features/meetings/pages/MeetingCategories";

const routesArray = [
  {
    path: appRoute.home,
    element: <Dashboard />,
  },
  { path: appRoute.master_list, element: <MasterList /> },
  { path: appRoute.prospects, element: <Prospects /> },
  { path: appRoute.authorized_applicants, element: <AuthorizedApplicants /> },

  { path: appRoute.dependents, element: <Dependents /> },
  { path: appRoute.settings, element: <Settings /> },
  { path: appRoute.escalation, element: <Escalation /> },
  { path: appRoute.defineEscalation, element: <NewEscalation /> },
  { path: appRoute.editEscalation().format, element: <EditEscalation /> },
  {
    path: appRoute.contractsEmailTemplates,
    element: <AllContractsEmailTemplates />,
  },
  {
    path: appRoute.viewEditEmailTemplate().format,
    element: <SettingsTemplate />,
  },
  { path: appRoute.applications, element: <Applications /> },
  { path: appRoute.meetings, element: <Meetings /> },
  { path: appRoute.meetingCategories, element: <MeetingCategories /> },
  { path: appRoute.payments, element: <Payments /> },
  { path: appRoute.paymentDetails().format, element: <PaymentDetails /> },
  { path: appRoute.generateReciept().format, element: <GenerateReceipt /> },
  { path: appRoute.viewInvoice().format, element: <ViewInvoice /> },
  { path: appRoute.viewQuote().format, element: <ViewQuote /> },
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
  // { path: appRoute.new_application().format, element: <NewApplication /> },
  {
    path: appRoute.applicant_documents_comments().format,
    element: <ApplicantDocumentComments />,
  },
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
    path: appRoute.newApplicationTemplate().format,
    element: <NewApplicationTemplate />,
  },
  // {
  //   path: appRoute.applicationTemplate().format,
  //   element: <ApplicationTemplateDetails />,
  // },
  {
    path: appRoute.countryMilestonesProgram,
    element: <CountryMilestonesAndPrograms />,
  },
  {
    path: appRoute.createProgramType,
    element: <CreateProgramType />,
  },
  {
    path: appRoute.editProgramType().format,
    element: <EditProgramType />,
  },
  {
    path: appRoute.defineFeesAndAuthorizedPersons,
    element: <DefineFeesAndAuthorizedPersons />,
  },
  {
    path: appRoute.addFees,
    element: <AddFees />,
  },
  {
    path: appRoute.editFees().format,
    element: <EditFees />,
  },
  { path: appRoute.document_requirement, element: <DocumentRequirements /> },
  { path: appRoute.investment_route, element: <InvestmentRoute /> },
  { path: appRoute.app_template, element: <ApplicationTemplate /> },
  { path: appRoute.department, element: <Department /> },
  { path: appRoute.employees, element: <Employees /> },
  { path: appRoute.branches, element: <Branches /> },
  { path: appRoute.roles, element: <Roles /> },
  { path: appRoute.companyProfile, element: <CompanyProfile /> },
  { path: appRoute.workflow, element: <Workflow /> },
  { path: appRoute.addWorkflow, element: <AddWorkflow /> },
  { path: appRoute.workflow_details().format, element: <WorkflowDetails /> },
  { path: appRoute.generate_quotes().format, element: <GenerateQuote /> },
  { path: appRoute.send_email().format, element: <SendEmail /> },
  {
    path: appRoute.attach_supporting_documents().format,
    element: <AttachDocuments />,
  },
  { path: appRoute.send_generated_quotes().format, element: <SendQuote /> },
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
