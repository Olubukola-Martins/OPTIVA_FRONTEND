export interface IActivityLogs {
  id: number;
  action_type: string;
  item: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}

export interface adminDashboardCounts {
  administrator: Administrator;
  dms: Dms;
  dpo: Dpo;
  dr: Dr;
  service_manager: ServiceManager;
  customer_experience: CustomerExperience;
  customer_engager: Customer_engager;
  audit: Audit;
}
// Administrator
interface Administrator {
  total_applications: number;
  authorized_applications: number;
  master_list: number;
  paid_applications: number;
  prospects: number;
  application_status: ApplicationStatus;
}

interface ApplicationStatus {
  under_review: number;
  inactive: number;
  submitted: number;
}
// Dms
interface Dms {
  total_applications: number;
  collated_documents: number;
  uncollated_documents: number;
  submited_applicant_documents: number;
  document_status: DocumentStatus;
  collation_status: CollationStatus;
}

interface CollationStatus {
  pending: number;
  approved: number;
  rejected: number;
}

interface DocumentStatus {
  collated_documents: number;
  uncollated_documents: number;
}

// Dpo
interface Dpo {
  total_applications: number;
  court_certified_documents: number;
  reviewed_documents: number;
  unreviewed_documents: number;
  document_status: DocumentStatusTwo;
}

interface DocumentStatusTwo {
  reviewed: number;
  unreviewed: number;
  court_certified: number;
}

// Dr
interface Dr {
  total_handover_from_dms: number;
  pending_handover: number;
  confirmed_handover: number;
  declined_handover: number;
  handover_status: HandoverStatus;
}

interface HandoverStatus {
  pending: number;
  confirmed: number;
  declined: number;
}

// service manager
interface ServiceManager {
  total_applications: number;
  total_assigned_to_dms: number;
  total_assigned_to_dpo: number;
  total_assigned_to_audit: number;
  application_status: ApplicationStatus;
}

// Audit
interface Audit {
  total_applications: number;
  internal_review: number;
  external_review: number;
  submitted_to_partner: number;
  submission_status: SubmissionStatus;
}

interface SubmissionStatus {
  bank_due_dilligence: number;
  approved: number;
  soft_copy: number;
  passport_delivered: number;
}

// customer engager
interface Customer_engager {
  total_applications_added: number;
  total_applications_submitted: number;
  total_quotes_generated: number;
  application_status: {
    pending: number;
    submitted: number;
  };
}

// customer experience
interface CustomerExperience {
  total_applications: number;
  active_application: number;
  inactive_application: number;
  submitted_to_partner: number;
  application_status: ApplicationStatus;
}









