export const appRoute = {
  // Authentication
  login_in: `/login`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,

  // Dashboard
  home: `/`,
  master_list: `/master-list`,
  authorized_applicants: `/authorized-applicants`,
  prospects: `/prospects`,

  // Settings
  settings: `/settings`,
  branches: `/branches`,
  dependents: `/settings/dependents`,
  document_requirement: `/settings/document-requirement`,
  investment_route: `/settings/investment-route`,
  app_template: `/settings/application-template`,
  escalation: `/settings/escalation`,
  defineEscalation: `/settings/escalation/defineEscalation`,
  editEscalation: (id?: number) => ({
    format: `/settings/escalation/editEscalation/:id`,
    path: `/settings/escalation/editEscalation/${id}`,
  }),
  contractsEmailTemplates: `/settings/contractsEmailTemplates`,
  viewEditEmailTemplate: (type?: string) => ({
    format: `/settings/contractsEmailTemplates/:type-email-template`,
    path: `/settings/contractsEmailTemplates/${type}-email-template`,
  }),
  documentRequirements: `/settings/documentsRequirements`,
  applicationTemplate: `/settings/applicationTemplate`,
  newApplicationTemplate: (id?: number) => ({
    format: `/settings/applicationTemplate/:id`,
    path: `/settings/applicationTemplate/${id}`,
  }),
  // newApplicationTemplate: `/settings/newApplicationTemplate`,
  countryMilestonesProgram: `/settings/countryMilestonesProgram`,
  createProgramType: `/settings/createProgramRoute`,
  defineFeesAndAuthorizedPersons: `/settings/defineFeesAndAuthorizedPersons`,
  addFees: `/settings/addfees`,
  editFees: (id?: number) => ({
    format: `/settings/editFees/:id`,
    path: `/settings/editFees/${id}`,
  }),
  editProgramType: (id?: number) => ({
    format: `/settings/editProgramType/:id`,
    path: `/settings/editProgramType/${id}`,
  }),
  department: `/settings/department`,
  employees: `/settings/employees`,
  roles: `/settings/roles`,
  companyProfile: `company-profile`,
  workflow: `/settings/workflow`,
  addWorkflow: `/settings/add-workflow`,
  workflow_details: (id?: number) => ({
    format: `/settings/workflow/:id`,
    path: `/settings/workflow/${id}`,
  }),

  // Applications
  applications: `/applications`,
  // applicantDetails: `/applicant-details`,
  applicant_details: (id?: number) => ({
    format: `/applicant-details/:id`,
    path: `/applicant-details/${id}`,
  }),
  timeline_extensions: (id?: number) => ({
    format: `/applications/timeline-extensions/:id`,
    path: `/applications/timeline-extensions/${id}`,
  }),
  processing_strategy_steps: (id?: number) => ({
    format: `/applications/processing_strategy_steps/:id`,
    path: `/applications/processing_strategy_steps/${id}`,
  }),
  comments: (id?: number) => ({
    format: `/applications/comments/:id`,
    path: `/applications/comments/${id}`,
  }),
  new_application: `/new_application`,
  // new_application: (id?: number) => ({
  //   format: `/settings/new_application/:id`,
  //   path: `/settings/new_application/${id}`,
  // }),
  applicant_documents: (id?: number) => ({
    format: `/applications/applicant_documents/:id`,
    path: `/applications/applicant_documents/${id}`,
  }),
  applicant_documents_comments: (id?: number) => ({
    format: `/applications/applicant_documents_comments/:id`,
    path: `/applications/applicant_documents_comments/${id}`,
  }),
  generate_quotes: (id?: number, investId?: number, countryId?: number) => ({
    format: `/applications/generate_quotes/:id/:countryId/:investId`,
    path: `/applications/generate_quotes/${id}/${countryId}/${investId}`,
  }),

  // Reports
  reports: `/reports`,

  // Payments
  payments: `/payments`,
  viewInvoice: (id?: number) => ({
    format: `/payments/:id/generateInvoice`,
    path: `/payments/${id}/generateInvoice`,
  }),
  viewQuote: (id?: number) => ({
    format: `/payments/:id/viewQuoteBreakdown`,
    path: `/payments/${id}/viewQuoteBreakdown`,
  }),

  paymentDetails: (id?: number) => ({
    format: `/payments/:id/paymentDetails`,
    path: `/payments/${id}/paymentDetails`,
  }),
  financialStatement: (id?: number) => ({
    format: `/payments/:id/financialStatement`,
    path: `/payments/${id}/financialStatement`,
  }),
  generateReciept: (id?: number) => ({
    format: `/payments/:id/generateReciept`,
    path: `/payments/${id}/generateReciept`,
  }),
  generateContract: (id?: number) => ({
    format: `/payments/:id/generateContract`,
    path: `/payments/${id}/generateContract`,
  }),

  paymentProof: (id?: number) => ({
    format: `/payments/:id/paymentProof`,
    path: `/payments/${id}/paymentProof`,
  }),

  // Meetings
  meetings: `/meetings`,
  meetingCategories: `/meetingCategories`,

  // ROLES
  send_email: (id?: number, emailId?: number) => ({
    format: `/applications/:id/send_email/:emailId`,
    path: `/applications/${id}/send_email/${emailId}`,
  }),
  attach_supporting_documents: (id?: number) => ({
    format: `/applications/:id/attach_documents`,
    path: `/applications/${id}/attach_documents`,
  }),

  // SEND GENERATED QUOTES
  send_generated_quotes: (id?: number, investId?: number) => ({
    format: `/admin/send-quote/:id/:investId`,
    path: `/admin/send-quote/${id}/${investId}`,
  }),
};
