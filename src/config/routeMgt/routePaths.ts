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
  timeline_extensions: `/applications/timeline-extensions`,
  processing_strategy_steps: `/applications/processing_strategy_steps`,
  comments: `/applications/comments`
  
};
