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
export interface IGetApplicationResponse {
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

//GET APPLICANT COMMENT
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
export interface ICreateDocComment {
  applicant_document_id: number;
  content: string;
}

// GET PROCESSING STRATEGY
export interface IGetProcessingStrategy {
  id: number;
  strategy: string;
  steps: string;
  application_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

// CREATE PROCESSING STRATEGY
export interface ICreateProcessingStrategy {
  application_id: number;
  steps: string;
  strategy: string;
}

// GET APPLICANT DOCUMENT BY CATEGORY
export interface IGetApplicantDocument {
  id: number;
  name: string;
  applicants_id: number;
  uploaded_by: number;
  document_category_id: number;
  document_requirement_id: number;
  status: string;
  handover_status: string;
  path: string;
  created_at: string;
  updated_at: string;
  dependants: Dependant[];
  applicant: Applicant;
  uploader: Uploader;
  category: Category;
  requirement: Requirement;
  comments: any[];
}

interface Requirement {
  id: number;
  name: string;
  document_type: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Uploader {
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

interface Applicant {
  id: number;
  application_id: number;
  branch_id: number;
  full_name: string;
  applicant_unique_id: string;
  email_address: string;
  amount_paid: string;
  user_id?: any;
  created_at: string;
  updated_at: string;
}

interface Dependant {
  id: number;
  document_requirement_id: number;
  eligible_dependant_id: number;
  created_at: string;
  updated_at: string;
  applicants_id: number;
  uploaded_by: number;
  document_category_id: number;
  path: string;
  status: string;
}

// APPROVE/REJECT HANDOVER DOC
export interface IApproveOrRejectDoc {
  approve?: string;
  decline?: string;
  document_id: number;
}

// ACTIVE APPLICATIONS
export interface IActiveAndInactiveApplications {
  id: number;
  country_id: number;
  investmentroute_id: number;
  programtype_id: number;
  template_id: number;
  milestone_id: number;
  process_id: number;
  branch_id: number;
  assigned_user_id: number;
  assigned_role_id: number;
  process_deadline?: any;
  status: string;
  active: boolean;
  is_quote_generated: number;
  is_payment_proof_uploaded: boolean;
  is_questions_submitted: boolean;
  is_threshold_payment: boolean;
  is_approved: boolean;
  no_of_dependents: number;
  created_at: string;
  updated_at: string;
  applicationcomment?: Applicationcomment[];
  applicant: Applicant;
}

interface Applicant {
  id: number;
  application_id: number;
  branch_id: number;
  full_name: string;
  applicant_unique_id: string;
  email_address: string;
  amount_paid: string;
  user_id?: any;
  created_at: string;
  updated_at: string;
}

interface Applicationcomment {
  id: number;
  comment: string;
  application_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}


export interface IDocumentComment {
  id: number;
  applicant_document_id: number;
  name: string;
  role: string[];
  content: string;
  time_sent: string;
  date_sent: string;
  created_at: string;
  updated_at: string;
}

// CREATE INACTIVE APPLICANT COMMENT
export interface ICreateInActiveComment {
  application_id: number;
  comment: string;
}

// UPDATE APPLICANT DOCUMENT
export interface IUpdateApplicantDocument {
  file: string;
  _method: string;
  id: number;
}

// GET ELIGIBLE DOCUMENT
export interface IGetEligibleDependentDoc {
  id: number;
  document_requirement_id: number;
  eligible_dependant_id: number;
  created_at: string;
  updated_at: string;
  applicants_id: number;
  uploaded_by: number;
  document_category_id: number;
  path: string;
  status: string;
  document_requirement: Documentrequirement;
  eligible_dependant: Eligibledependant;
  document_category: Documentcategory;
  applicant: Applicant;
  uploader: Uploader;
}

interface Uploader {
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

interface Applicant {
  id: number;
  application_id: number;
  branch_id: number;
  full_name: string;
  applicant_unique_id: string;
  email_address: string;
  amount_paid: string;
  user_id?: any;
  created_at: string;
  updated_at: string;
}

interface Documentcategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Eligibledependant {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
}

interface Documentrequirement {
  id: number;
  name: string;
  document_type: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
}


// QUOTES
// St Kitts and Nevis Quotes
export interface IGenerateStKittsNevisQuotes {
  id:number
  total_number_of_applicants: number;
  size_of_family: number;
  does_applicant_have_a_spouse: string;
  add_dependents_ls_than_eighteen: number;
  add_dependents_gt_than_eighteen: number;
  children_zero_to_fifteen: number;
  children_sixteen_to_eighteen: number;
  children_gt_than_eighteen: number;
  parents_gt_than_sixty_five: number;
  grand_parents_gt_than_fifty_five: number;
  siblings_zero_to_fifteen: number;
  siblings_gt_than_fifteen: number;
  dependents_ls_than_fifteen: number;
  dependents_greater_than_fifteen: number;
}

export interface IGenerateStLuciaQuotes {
  id:number
  total_number_of_applicants: number;
  does_applicant_have_a_spouse: string;
  number_of_add_depn_if_spouse_max_two: number;
  number_of_add_depn_if_spouse: number;
  number_of_add_depn_no_spouse: number;
  number_of_dependents_ls_than_sixteen: number;
  number_of_dependents_gt_than_sixteen: number;
}

export interface IGenerateDominicaQuotes {
  id:number
  total_number_of_applicants: number;
  size_of_family: number;
  does_applicant_have_a_spouse: string;
  number_of_dependent_less_than_sixteen: number;
  number_of_dependent_greater_than_sixteen: number;
  number_of_add_dependent_less_than_eighteen: number;
  number_of_add_dependent_greater_than_eighteen: number;
}

export interface IGenerateGrenadaRealEstateQuotes {
  id:number
  total_num_of_applicants: number;
  size_of_family: number;
  does_applicant_have_a_spouse: string;
  num_of_add_dependents: number;
  num_of_unmarried_siblings: number;
  num_of_dependent_less_than_eq_sixteen: number;
  num_of_dependent_greater_than_seventeen: number;
  num_of_dependent_less_than_fifty_five: number;
  num_of_dependent_greater_than_fifty_five: number;
}

export interface IGenerateGrenadaDonationQuotes {
  id:number
  total_num_of_applicants: number;
  size_of_family: number;
  does_applicant_have_a_spouse: string;
  num_of_add_dependents: number;
  num_of_unmarried_dependents: number;
  num_of_dependent_less_than_eq_sixteen: number;
  num_of_dependent_greater_than_seventeen: number;
  num_of_dependent_seventeen_to_twenty_five: number;
  num_of_parents_less_than_fifty_five: number;
  num_of_parents_greater_than_fifty_five: number;
}

export interface IGenerateAntiguaJointRealEstateQuotes {
  id:number
  total_number_of_applicants: number;
  does_applicant_have_a_spouse: string;
  number_of_dependent_zero_to_eleven: number;
  number_of_dependent_twelve_to_seventeen: number;
  number_of_dependent_greater_than_eighteen: number;
  number_of_dependent_greater_than_fifty_eight: number;
}

export interface IGenerateAntiguaDonationQuotes {
  id:number
  total_number_of_applicants: number;
  does_applicant_have_a_spouse: string;
  number_of_dependent_zero_to_eleven: number;
  number_of_dependent_twelve_to_seventeen: number;
  number_of_dependent_greater_than_eighteen: number;
  number_of_dependent_greater_than_fifty_eight: number;
}


// MARK APPLICANT AS COMPLETE
export interface IMarkApplicationComplete {
  application_id: number;
}

// APPLICANTS BY ROLE
export interface IApplicantsByRole {
  id: number;
  applicant_name: string;
  applicant_id: string;
  country: string;
  program_type: string;
  milestone?: any;
  process?: any;
  investmentroute: string;
  branch: string;
  comments: Comment[];
  user_assigned: any[];
  country_id: number;
  investmentroute_id: number;
  programtype_id: number;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: number;
  comment: string;
  application_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}