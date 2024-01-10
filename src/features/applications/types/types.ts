// POST APPLICATION
export interface ICreateApplication {
  country_id: number;
  investmentroute_id: number;
  programtype_id: number;
  email_address: string;
  full_name: string;
  branch_id: number;
  no_of_dependents: number;
}

// FETCH ALL APPLICANTS
interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

interface Links {
  first: string;
  last: string;
  prev?: any;
  next?: any;
}

export interface IApplications {
  id: number;
  applicant_unique_id: string;
  application_id: number;
  applicant_name: string;
  active: boolean;
  completed: boolean;
  country: string;
  branch: string;
  program_type: string;
  investmentroute: string;
  number_of_dependents: number;
  application_milestone: string;
  assigned_to?: any;
  created_at: string;
  updated_at: string;
}

// POST APPLICATION RESPONSE
export interface ICreateApplicationResponse {
  application_id: number;
  responses: Response[];
}

interface Response {
  question_id: number;
  response: string[];
  subsection_name?: string;
}

//GET APPLICATION RESPONSE
export interface IGetApplicationResponse{
  id: number;
  question_id: number;
  application_id: number;
  section_name: string;
  subsection_name?: any;
  response: string[];
  created_at: string;
  updated_at: string;
  question: Question;
}

interface Question {
  id: number;
  template_id: number;
  form_question: string;
  input_type: string;
  options?: any;
  is_required: number;
  section_name: string;
  subsection_name?: string;
  schema_name: string;
  created_at: string;
  updated_at: string;
}

// UPDATE APPLICATION STATUS
export interface IApplicationStatus {
  id: number;
  status: string;
}

// ACCEPT APPLICANT
export interface IAcceptApplicant {
  application_id: number;
}

// GET TIMELINE EXTENSION
export interface ITimelineExtension {
  id: number;
  user_id: number;
  application_id: number;
  reason: string;
  end_date: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  current_branch_id: number;
  is_super_admin: boolean;
  user_type: string;
  last_login_at: string;
  last_login_ip: string;
  email: string;
  email_verified_at?: any;
  phone?: any;
  employee_id: number;
  role_id: number;
  intl_id?: any;
  applicant_id?: any;
  is_active: boolean;
  image: string;
  created_at?: any;
  updated_at: string;
}

// CREATE TIMELINE EXTENSION
export interface ICreateTimelineExtension {
  application_id: number;
  reason: string;
  end_date: string;
}

// REASSIGN APPLICANT
export interface IReassignApplicant {
  id: number;
  role_id: number;
  assigned_user_id: number;
}

// GET COMMENT 
export interface IComment {
  id: number;
  comment: string;
  application_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  current_branch_id: number;
  is_super_admin: boolean;
  user_type: string;
  last_login_at: string;
  last_login_ip: string;
  email: string;
  email_verified_at?: any;
  phone?: any;
  employee_id: number;
  role_id: number;
  intl_id?: any;
  applicant_id?: any;
  is_active: boolean;
  image: string;
  created_at?: any;
  updated_at: string;
}

// CREATE COMMENT
export interface ICreateComment {
  application_id: number;
  comment: string;
}