export const appRoute = {
  home: `/`,
  login_in: `/login`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,
  settings: `/settings`,
  dependents: `/settings/dependents`,

  // Applications
  applications: `/applications`,
  applicantDetails: `/applicant-details`,
  applicantBrief: `/applicant-brief`,

  reports: `/reports`,
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
  // applicantDetails: `/applicant-details`,
  applicant_details: (id?: number) => ({
    format: `/applicant-details/:id`,
    path: `/applicant-details/${id}`,
  }),
  timeline_extensions: `/applications/timeline-extensions`,
  processing_strategy_steps: `/applications/processing_strategy_steps`,
  comments: `/applications/comments`
  
};
