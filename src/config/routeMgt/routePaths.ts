export const appRoute = {
  home: `/`,
  login_in: `/login`,
  forgot_password: `/forgot-password`,
  reset_password: `/reset-password`,
  settings: `/settings`,
  dependents: `/settings/dependents`,

  // Applications
  applications: `/applications`,
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
  })
};
