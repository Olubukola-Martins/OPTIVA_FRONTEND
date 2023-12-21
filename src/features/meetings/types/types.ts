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
  data: IPaymentDatum[];
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

export interface IPaymentDatum {
  id: number;
  application_id: number;
  quote_id: number;
  amount_paid: string;
  outstanding_payment: string;
  is_confirmed: boolean;
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
  amount_paid: string;
  user_id?: any;
  created_at: string;
  updated_at: string;
}

// Quotes 
export interface IAllGeneratedQuotes {
  data: IGeneratedQuoteDatum[];
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
  quotation_status: number;
  generated_by: string;
  created_at: string;
  updated_at: string;
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