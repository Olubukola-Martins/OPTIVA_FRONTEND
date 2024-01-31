export const appRoute = {
  home: `/`,
  login_in: `/login`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,

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
  applicationTemplateDetails: (id?: number) => ({
    format: `/settings/applicationTemplateDetails/:id`,
    path: `/settings/applicationTemplateDetails/${id}`,
  }),
  newApplicationTemplate: `/settings/newApplicationTemplate`,
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
  new_application: `/applications/new_application`,
  applicant_documents: (id?: number) => ({
    format: `/applications/applicant_documents/:id`,
    path: `/applications/applicant_documents/${id}`,
  }),
  applicant_documents_comments: (id?: number) => ({
    format: `/applications/applicant_documents_comments/:id`,
    path: `/applications/applicant_documents_comments/${id}`,
  }),
  generate_quotes: (id?: number) => ({
    format: `/applications/generate_quotes/:id`,
    path: `/applications/generate_quotes/${id}`,
  }),

  // Reports
  reports: `/reports`,

  // Payments
  payments: `/payments`,
  viewInvoice: (id?: number) => ({
    format: `/payments/:id/generateInvoice`,
    path: `/payments/${id}/generateInvoice`,
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
};
