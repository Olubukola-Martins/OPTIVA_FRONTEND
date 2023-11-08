export const appRoute = {
  home: `/`,
  login_in: `/login`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,

  //Settings
  settings: `/settings`,
  dependents: `/settings/dependents`,
  escalation: `/settings/escalation`,
  defineEscalation: `/settings/escalation/defineEscalation`,
  editEscalation: (id?: number) => ({
    format: `/settings/escalation/editEscalation/:id`,
    path: `/settings/escalation/editEscalation/${id}`,
  }),
  contractsEmailTemplates: `/settings/contractsEmailTemplates`,
  contractsTemplate: `/settings/contractsEmailTemplates/Contract`,
  onboardingWelcomeTempl: `/settings/contractsEmailTemplates/onboardingWelcome`,
  collationAppointmentConfirmTempl: `/settings/contractsEmailTemplates/collationAppointmentConfirmation`,
  cbiBankDDclearance: `/settings/contractsEmailTemplates/CBIBankDDclearance`,
  cbiBAsoftPassportReceipt: `/settings/contractsEmailTemplates/CBIbankAppSoftPassportReceipt`,
  cbiBAapprovalMailTemp: `/settings/contractsEmailTemplates/CBIbankAppApprovalMailTemplate`,
  cbiApplicationSubmissionMailTemp: `/settings/contractsEmailTemplates/CBIapplicationSubmissioneEMailTemplate`,

  // Applications
  applications: `/applications`,
  applicantDetails: `/applicant-details`,
  applicantBrief: `/applicant-brief`,
  // applicantDetails: `/applicant-details`,
  applicant_details: (id?: number) => ({
    format: `/applicant-details/:id`,
    path: `/applicant-details/${id}`,
  }),
  timeline_extensions: `/applications/timeline-extensions`,
  processing_strategy_steps: `/applications/processing_strategy_steps`,
  comments: `/applications/comments`,

  // Reports
  reports: `/reports`,

  // Payments
  payments: `/payments`,
  generateInvoice: (id?: number) => ({
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
