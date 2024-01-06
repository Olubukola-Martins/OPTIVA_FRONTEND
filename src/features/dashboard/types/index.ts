export interface adminDashboardCounts {
  administrator: {
    total_applications: number;
    master_list: number;
    paid_applications: number;
    prospects: number;
    application_status: {
      under_review: number;
      rejected: number;
      submitted: number;
    };
  };
  customer_experience: {
    total_applications: number;
    active_application: number;
    inactive_application: number;
    submitted: number;
    application_status: {
      under_review: number;
      rejected: number;
      submitted: number;
    };
  };

//   dms: {
//     total_applications: number;
//   };
}


