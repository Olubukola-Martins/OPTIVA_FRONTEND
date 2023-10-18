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
  // applicantDetails: `/applicant-details`,
  applicant_details: (id?: number) => ({
    format: `/applicant-details/:id`,
    path: `/applicant-details/${id}`,
  }),
  timeline_extensions: (id?: number) => ({
    format: `/applications/timeline-extensions/:id`,
    path: `/applications/timeline-extensions${id}`,
  }),
  processing_strategy_steps: (id?: number) => ({
    format: `/applications/processing_strategy_steps/:id`,
    path: `/applications/processing_strategy_steps/${id}`,
  }),
  comments: (id?: number) => ({
    format: `/applications/comments/:id`,
    path: `/applications/comments/${id}`,
  }),
  new_application: (id?: number) => ({
    format: `/applications/new_application/:id`,
    path: `/applications/new_application/${id}`,
  }),

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
