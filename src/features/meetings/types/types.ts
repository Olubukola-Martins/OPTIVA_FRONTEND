export type Appointment = {
  id?: number;
  status?: string;
  location?: string;
  resource?: string;
  address?: string;
  start: string | Date;
  end: string | Date;
};

export type EventItem = {
  start: Date;
  end: Date;
  data?: { appointment?: Appointment };
  isDraggable?: boolean;
};

export interface INewMeeting {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location?: string;
  link?: string;
  attendees: number[];
  _method?: string;
}

export interface IUserMeetingsData {
  success: boolean;
  data: ISingleMeeting[];
  message: string;
  meta: string;
}

export interface ISingleMeeting {
  id: number;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  link?: any;
  organizer_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  attendees: AttendeeData[];
}

export interface AttendeeData {
  id: number;
  name: string;
  current_branch_id?: any;
  is_super_admin: boolean;
  user_type: string;
  last_login_at: string;
  last_login_ip: string;
  email: string;
  email_verified_at?: any;
  phone?: any;
  employee_id?: (null | number)[];
  intl_id?: any;
  applicant_id?: any;
  is_active: boolean;
  image: string;
  created_at?: string | string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  meeting_id: number;
  user_id: number;
  availability_status: string;
  created_at: string;
  updated_at: string;
}

//Single contract and email template data
export interface ISingleContractEmailTemplateData {
  success: boolean;
  data: ContractEmailTemplateDatum[];
  message: string;
  meta: string;
}

export interface ContractEmailTemplateDatum {
  id: number;
  name: string;
  file: string;
  content: string;
  type: string;
  created_at?: any;
  updated_at: string;
  pages: Page[];
}

interface Page {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  email_template_id: number;
}

// export interface IFetchAllMeetings {
//   success: boolean;
//   data: IFetchMeetingDatum[];
//   message: string;
//   meta: string;
// }

// interface IFetchMeetingDatum {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   start_time: string;
//   end_time: string;
//   location: string;
//   organizer_id: number;
//   status: number;
//   created_at: string;
//   updated_at: string;
// }

// Payments

export interface IAllPayments {
  data: PaymentsDatum[];
  links: Links;
  meta: Meta;
}

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



export interface PaymentsDatum {
  id: number;
  application_id: number;
  quote_id: number;
  amount_paid: string;
  outstanding_payment: string;
  branch_id: number;
  is_confirmed: boolean;
  created_at: string;
  updated_at: string;
  application: Application;
  fee?: any;
}

interface Application {
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
  is_submitted: boolean;
  is_authorized: number;
  is_completed: number;
  added_by: string;
  applicant: Applicant;
  country: Country;
  investmentroute: Investmentroute;
  programtype: Programtype;
}

interface Programtype {
  id: number;
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  created_at: string;
  updated_at: string;
}

interface Investmentroute {
  id: number;
  investment_name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
}

interface Country {
  id: number;
  country_name: string;
  created_at?: any;
  updated_at?: any;
}

interface Applicant {
  id: number;
  application_id: number;
  branch_id: number;
  full_name: string;
  applicant_unique_id: string;
  email_address: string;
  phone_number: string;
  amount_paid: string;
  user_id?: any;
  created_at: string;
  updated_at: string;
  uploaded: string;
  verified: string;
  validated: string;
}

// Quotes


export interface IAllGeneratedQuotes {
  success: boolean;
  data: IGenQuoteData;
  message: string;
  meta: any[];
}

interface IGenQuoteData {
  current_page: number;
  data: IGeneratedQuoteDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface IGeneratedQuoteDatum {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  applicant_full_name: string;
  country: string;
  investment_route: string;
  number_of_dependents: string;
  quotation_total: number;
  country_investment_total: number;
  local_prc_fee: number;
  quotation_status: number;
  generated_by: string;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now: number;
  local_processing_fee_due_on_approval: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
  applicant: IAllGenQuoteApplicant;
}

interface IAllGenQuoteApplicant {
  id: number;
  application_id: number;
  branch_id: number;
  full_name: string;
  applicant_unique_id: string;
  email_address: string;
  phone_number: string;
  amount_paid: string;
  user_id?: number;
  created_at: string;
  updated_at: string;
  uploaded: string;
  verified: string;
  validated: string;
  application: Application;
}

interface Application {
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
  is_submitted: boolean;
  is_authorized: number;
  is_completed: number;
  added_by: string;
  documents: Document[];
  country: Country;
  investmentroute: Investmentroute;
  programtype: Programtype;
}

interface Programtype {
  id: number;
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  created_at: string;
  updated_at: string;
}

interface Investmentroute {
  id: number;
  investment_name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
}

interface Country {
  id: number;
  country_name: string;
  created_at?: any;
  updated_at?: any;
}

interface Document {
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
  audit_status: string;
  internally_reviewed: string;
  externally_reviewed: string;
  is_completed: number;
  application_id: number;
  dependants: any[];
}

// Outstanding payments
export interface IAllOutstandingPayments {
  data: OutstandingPaymentDatum[];
  links: Links;
  meta: Meta;
}

export interface OutstandingPaymentDatum {
  id: number;
  application_id: number;
  quote_id: number;
  amount_paid: string;
  outstanding_payment: string;
  is_confirmed: boolean;
  created_at: string;
  updated_at: string;
  application: Application;
  fee?: any;
}

// ALL PAYMENT DETAILS
export interface IAllPaymentDetails {
  data: PaymentDetailDatum[];
  links: Links;
  meta: Meta;
}
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

export interface PaymentDetailDatum {
  id: number;
  payment_id: number;
  fx_rate: string;
  naira_payment: string;
  dollar_payment: string;
  outstanding_payment: string;
  date_paid: string;
  narration: string;
  proof_of_payment_file?: any;
  paid_by: string;
  updated_by: Updatedby;
  created_at: string;
  updated_at: string;
  payment: Payment;
}

interface Payment {
  id: number;
  application_id: number;
  quote_id: number;
  amount_paid: string;
  outstanding_payment: string;
  is_confirmed: boolean;
  created_at: string;
  updated_at: string;
}

interface Updatedby {
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
  intl_id?: any;
  applicant_id?: any;
  is_active: boolean;
  image: string;
  created_at?: any;
  updated_at: string;
}

export interface IAllInvoices {
  data: InvoiceDatum[];
  links: Links;
  meta: Meta;
}

export interface InvoiceDatum {
  id: number;
  application_id: number;
  description: string;
  quantity: number;
  amount: string;
  updated_by: Updatedby;
  created_at: string;
  updated_at: string;
  application: Application;
}

interface Application {
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
  applicant: Applicant;
  country: Country;
  investmentroute: Investmentroute;
}

// Generate Financial Statement
export interface IGenFinancialState {
  data: GenFinStatementDatum[];
  links: Links;
  meta: Meta;
}

export interface GenFinStatementDatum {
  id: number;
  payment_id: number;
  fx_rate?: any;
  naira_payment: string;
  dollar_payment: string;
  outstanding_payment: string;
  date_paid: string;
  narration: string;
  proof_of_payment_file?: any;
  paid_by: number;
  updated_by: Updatedby;
  created_at: string;
  updated_at: string;
  payment: Payment;
}

interface Payment {
  id: number;
  application_id: number;
  quote_id: number;
  amount_paid: string;
  outstanding_payment: string;
  is_confirmed: boolean;
  created_at: string;
  updated_at: string;
  quote: Quote;
  application: Application;
}

interface Application {
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
  applicant: Applicant;
  country: Country;
  investmentroute: Investmentroute;
  programtype: Programtype;
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

interface Quote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  applicant_full_name: string;
  country: string;
  investment_route: string;
  number_of_dependents: string;
  quotation_total: number;
  country_investment_total: number;
  local_prc_fee: number;
  quotation_status: number;
  generated_by: string;
  created_at: string;
  updated_at: string;
}

// Generate Invoice
export interface IGenInvoice {
  success: boolean;
  data: GenInvoiceData;
  message: string;
  meta: any[];
}

export interface GenInvoiceData {
  id: number;
  application_id: number;
  description: string;
  quantity: number;
  amount: string;
  updated_by: Updatedby;
  created_at: string;
  updated_at: string;
  fx_rate: string;
  amount_in_naira: string;
  totalAmountUSD: number;
  totalAmountNaira: number;
  application: Application;
}

interface Application {
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
  applicant: Applicant;
  country: Country;
  investmentroute: Investmentroute;
  programtype: Programtype;
}

// Generate Receipt
export interface IGenReceipt {
  success: boolean;
  data: GenReceiptData;
  message: string;
  meta: any[];
}

export interface GenReceiptData {
  id: number;
  payment_id: number;
  fx_rate?: any;
  naira_payment: string;
  dollar_payment: string;
  outstanding_payment: string;
  date_paid: string;
  narration: string;
  proof_of_payment_file?: any;
  paid_by: number;
  updated_by: Updatedby;
  created_at: string;
  updated_at: string;
  payment: Payment;
}

// View Quote Breakdown
export interface IViewQuote {
  success: boolean;
  data: ViewQuoteData;
  message: string;
  meta: any[];
}

interface ViewQuoteData {
  Applicant_info: ApplicantDonationInfo | ApplicantRealEstateinfo;
  Applicant_quote_breakdown:
    | Antiguadonationquote
    | Antiguasinglequote
    | Antiguajointquote
    | Grenadadonationquote
    | Dominicadonationquote
    | Grenadaestatequote
    | Stkittsandnevisestatequote
    | Stluciaestatequote;
}
export interface ApplicantDonationInfo {
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
  quote: Quote;
  antigua_donation_quote?: Antiguadonationquote;
  dominica_donation_quote?: Dominicadonationquote;
  grenada_donation_quote?: Grenadadonationquote;
}
export interface ApplicantRealEstateinfo {
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
  quote: Quote;
  antigua_single_quote?: Antiguasinglequote;
  grenada_estate_quote?: Grenadaestatequote;
  antigua_joint_quote?: Antiguajointquote;
  st_kitts_and_nevis_estate_quote?: Stkittsandnevisestatequote;
  st_lucia_estate_quote?: Stluciaestatequote;
}
interface Quote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  applicant_full_name: string;
  country: string;
  investment_route: string;
  number_of_dependents: string;
  quotation_total: number;
  country_investment_total: number;
  local_prc_fee: number;
  quotation_status: number;
  generated_by: string;
  created_at: string;
  updated_at: string;
}

// Quote breakdown for  "investment_route": "Antigua & Barbuda donation"
export interface Antiguadonationquote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  govt_contribution_fee: number;
  govt_processing_fee: number;
  due_diligence_fee: number;
  govt_passport_oath_and_allegiance_fee: number;
  legal_and_advisory_fee: number;
  antigua_barbuda_donation_total: number;
  local_processing_fee: number;
  local_processing_fee_due_now: number;
  local_processing_fee_due_on_approval: number;
  program_grand_total: number;
  program_grand_total_due_now: number;
  program_grand_total_due_on_approval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
}

// Quote breakdown for "investment_route": "Antigua & Barbuda Single Real Estate"

export interface Antiguasinglequote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  real_estate_investment_fee: number;
  govt_processing_fee: number;
  due_diligence_fee: number;
  govt_passport_oath_and_allegiance_fee: number;
  legal_and_advisory_fee: number;
  antigua_barbuda_single_estate_total: number;
  local_processing_fee: number;
  local_processing_fee_due_now: number;
  local_processing_fee_due_on_approval: number;
  program_grand_total: number;
  program_grand_total_due_now: number;
  program_grand_total_due_on_approval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
}
// Quote breakdown for "investment_route": "Antigua & Barbuda Joint Real Estate",
export interface Antiguajointquote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  real_estate_investment_fee: number;
  govt_processing_fee: number;
  due_diligence_fee: number;
  govt_passport_oath_and_allegiance_fee: number;
  legal_and_advisory_fee: number;
  antigua_barbuda_joint_estate_total: number;
  local_processing_fee: number;
  local_processing_fee_due_now: number;
  local_processing_fee_due_on_approval: number;
  program_grand_total: number;
  program_grand_total_due_now: number;
  program_grand_total_due_on_approval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
}
// Quote breakdown for  "investment_route": "Dominica donation"

export interface Dominicadonationquote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  govt_contribution_fee: number;
  govt_processing_fee: number;
  govt_due_diligence_fee: number;
  govt_cert_neutralization_fee: number;
  local_processing_fee: number;
  local_processing_fee_due_now: number;
  local_processing_fee_after_approval: number;
  dominica_total: number;
  program_total: number;
  program_total_due_now: number;
  program_total_due_after_approval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
}

// Quote breakdown for  "investment_route": "Grenada donation"
export interface Grenadadonationquote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  govt_contribution_fee: number;
  govt_ntf_application_fee: number;
  govt_due_diligence_fee: number;
  govt_processing_fee: number;
  govt_passport_oath_and_allegiance_fee: number;
  grenada_bank_fee: number;
  grenada_local_agent_fee: number;
  grenada_legal_and_advisory_fee: number;
  program_grand_total: number;
  totalDueNow: number;
  totalDueAfterApproval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
}
// Quote breakdown for  "investment_route": "Grenada Real Estate"

export interface Grenadaestatequote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  govt_fee: number;
  real_estate_investment_fee: number;
  govt_application_fee: number;
  govt_due_diligence_fee: number;
  govt_processing_fee: number;
  govt_passport_oath_and_allegiance_fee: number;
  grenada_bank_fee: number;
  grenada_local_agent_fee: number;
  grenada_legal_and_advisory_fee: number;
  grenadaRealEstateTotal: number;
  localProcessingFee: number;
  localProcessingFeeDueNow: number;
  localProcessingFeeDueAfterApproval: number;
  program_grand_total: number;
  programTotalDueNow: number;
  programTotalDueAfterApproval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
}
// Quote breakdown for  "investment_route": "ST Kitts & Nevis Real Estate"

export interface Stkittsandnevisestatequote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  govt_contribution: number;
  application_fee: number;
  due_dil_and_prc_fee: number;
  passport_and_oath_of_allegiance_fee: number;
  courier_and_bank_fee: number;
  bank_due_dil_fee: number;
  local_agent_fee_vat: number;
  legal_advisory_fee: number;
  local_prc_fee: number;
  local_prc_fee_due_now: number;
  local_prc_due_after_approval: number;
  program_total: number;
  program_total_due_now: number;
  program_total_due_after_approval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
  st_kitts_total: number;
}

// Quote breakdown for  "investment_route": "ST Lucia NEFI Real Estate"

export interface Stluciaestatequote {
  id: number;
  applicant_id: number;
  applicant_unique_id: string;
  contribution_for_main_applicant: number;
  contribution_for_dependents: number;
  govt_prc_fee: number;
  govt_due_dil: number;
  govt_passport_fee: number;
  localProcessingFee: number;
  localProcessingFeeDueNow: number;
  localProcessingFeeDueAfterApproval: number;
  program_grand_total: number;
  programTotalDueNow: number;
  programTotalDueAfterApproval: number;
  created_at: string;
  updated_at: string;
  country_fee_due_now: number;
  country_fee_due_on_approval: number;
  country_fee_due_now_percentage: number;
  local_processing_fee_due_now_percentage: number;
  total_due_now: number;
  total_due_on_citizenship_approval: number;
  st_lucia_total: number;
}

/// FX Rates
export interface IAllFxRates {
  success: string;
  message: string;
  data:{
  id: number;
  source_currency: string;
  target_currency: string;
  source_currency_amount: number;
  target_currency_amount: number;
  created_at: string;
  updated_at: string;
}}

// export interface all prospects
export interface IAllProspectsData {
  data: IProspectDatum[];
  links: Links;
  meta: Meta;
}


export interface IProspectDatum {
  id: number;
  applicant_name: string;
  applicant_id: string;
  country: string;
  program_type: string;
  milestone: string;
  process: string;
  investmentroute: string;
  branch: string;
  comments: Comment[];
  applicant_documents: any[];
  user_assigned: any[];
  milestone_id: number;
  country_id: number;
  added_by: string;
  no_of_dependents: number;
  investmentroute_id: number;
  programtype_id: number;
  status: string;
  uploaded: string;
  verified: string;
  validated: string;
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

export interface IMeetingCategoryData {
  success: boolean;
  data: IMeetingCategoryDatum[];
  message: string;
  meta: string;
}

export interface IMeetingCategoryDatum {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}