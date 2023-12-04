export interface IAuthorizedPerson{
    created_at: string
    employee: string
    id: number
    signature: string
    updated_at:string
}

// EMPLOYEE TYPES TO BE DELETED
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

export interface IEmployee {
  id: number;
  name: string;
  email: string;
  department_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  department: Department;
}

interface Department {
  id: number;
  name: string;
  department_head_id?: any;
  branch_id: number;
  created_at: string;
  updated_at: string;
  branch: Branch;
}

interface Branch {
  id: number;
  name: string;
  email?: any;
  address_details?: any;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  is_super_admin: boolean;
  user_type: string;
  last_login_at?: any;
  last_login_ip?: any;
  email: string;
  email_verified_at?: any;
  is_active: boolean;
  image: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  user_id: number;
  role_id: number;
}


// FEES
export interface IFees {
  id: number;
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: string;
  local_processing_fee_threshold_payment: string;
  local_processing_fee_balance_payment: string;
  program_threshold_payment: string;
  program_balance_payment: string;
  created_at: string;
  updated_at: string;
  country: Country;
  investment_route: Investmentroute;
  dominica_donation_fee?: Dominicadonationfee;
  grenada_donation_fee?: any;
  antigua_donation_fee?: Antiguadonationfee;
  antigua_joint_real_estate_fee?: Antiguadonationfee;
  antigua_single_real_estate_fee?: Antiguadonationfee;
  grenada_real_estate_fee?: Grenadarealestatefee;
  st_kitts_nevis_real_estate_fee?: Stkittsnevisrealestatefee;
  st_lucia_nefi_real_estate_fee?: Stlucianefirealestatefee;
}

interface Stlucianefirealestatefee {
  id: number;
  investment_route_id: number;
  country_id: number;
  nefi_bution_for_main_applicant: string;
  nefi_bution_for_spouse: string;
  nefi_bution_for_add_depn: string;
  nefi_bution_for_more_depn: string;
  nefi_bution_for_add_depn_no_spouse: string;
  govt_prc_fee_for_main_applicant: string;
  govt_prc_fee_for_spouse: string;
  govt_prc_fee_for_add_depn: string;
  govt_due_dil_fee_for_main_applicant: string;
  govt_due_dil_fee_for_spouse: string;
  govt_due_dil_fee_for_depn_ls_than_sixteen: string;
  govt_due_dil_fee_for_depn_gt_than_sixteen: string;
  legal_and_advisory_fee: string;
  local_agent_and_vat_fee: string;
  passport_fee: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

interface Stkittsnevisrealestatefee {
  id: number;
  investment_route_id: number;
  country_id: number;
  sgf_dona_for_principal_applicant: string;
  sgf_dona_for_spouse_or_other_dependent: string;
  sgf_dona_for_family_of_four: string;
  sgf_dona_for_additional_dependents_ls_than_eighteen: string;
  sgf_dona_application_fee: string;
  due_dil_and_prc_fee_for_main_applicant: string;
  due_dil_and_prc_fee_for_spouse: string;
  due_dil_and_prc_fee_for_children_zero_to_fifteen: string;
  due_dil_and_prc_fee_for_children_sixteen_to_eighteen: string;
  due_dil_and_prc_fee_for_children_gt_than_or_eq_eighteen: string;
  due_dil_and_prc_fee_for_parents_gt_than_or_eq_sixty_five: string;
  due_dil_and_prc_fee_for_grand_parents_gt_than_or_eq_fifty_five: string;
  due_dil_and_prc_fee_for_siblings_zero_to_fifteen: string;
  due_dil_and_prc_fee_for_siblings_gt_than_or_eq_fifteen: string;
  govt_passport_and_oath_of_allegiance_fee: string;
  courier_fee_and_bank_transfer_fee: string;
  bank_due_dil_fee_for_principal_applicant: string;
  bank_due_dil_fee_for_spouse: string;
  bank_due_dil_fee_for_depn_ls_than_fifteen: string;
  bank_due_dil_fee_for_depn_gt_than_fifteen: string;
  legal_advisory_fee: string;
  local_agent_fee_and_vat: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

interface Grenadarealestatefee {
  id: number;
  investment_route_id: number;
  country_id: number;
  real_estate_investment_for_family: string;
  govt_sposeless_fee: string;
  govt_fee_for_family_of_four: string;
  govt_fee_for_additional_children: string;
  govt_fee_for_parents_ls_than_fifty_five: string;
  govt_fee_for_parents_gt_than_fifty_five: string;
  govt_fee_for_unmarried_siblings: string;
  govt_application_fee: string;
  due_dil_fee_for_main_applicant: string;
  due_dil_fee_for_spouse: string;
  due_dil_fee_for_add_depn_ls_than_or_eq_sixteen: string;
  due_dil_fee_for_add_depn_gt_than_sixteen: string;
  govt_prc_fee_for_main_applicant: string;
  govt_prc_fee_for_spouse: string;
  govt_prc_fee_for_add_dep_ls_than_or_eq_sixteen: string;
  govt_prc_fee_for_add_dep_gt_than_sixteen: string;
  govt_passport_and_oath_of_allegiance_fee: string;
  bank_escrow_management_fee: string;
  local_agent_fee_and_vat: string;
  legal_advisory_fee: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

interface Antiguadonationfee {
  id: number;
  investment_route_id: number;
  country_id: number;
  bution_fee_for_applicants: string;
  govt_prc_fee_for_family_of_four: string;
  govt_prc_fee_for_family_gt_than_four: string;
  due_dil_for_main_applicant: string;
  due_dil_for_spouse: string;
  due_dil_for_depn_zero_to_eleven: string;
  due_dil_for_depn_twelve_to_seventeen: string;
  due_dil_for_depn_gt_than_eighteen: string;
  due_dil_for_depn_gt_than_fifty_eight: string;
  goverment_passport_and_oath_of_allegiance_fee: string;
  bank_and_escrow_fee: string;
  local_agent_fee_and_vat: string;
  legal_and_advisory_fee: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

interface Dominicadonationfee {
  id: number;
  investment_route_id: number;
  country_id: number;
  edf_bution_for_main_applicant: string;
  edf_bution_for_spouse: string;
  edf_bution_for_family_of_four: string;
  edf_bution_for_add_depn_ls_than_eighteen: string;
  edf_bution_for_add_depn_gt_than_eighteen: string;
  govt_processing_fee: string;
  due_dil_fee_for_main_applicant: string;
  due_dil_fee_for_spouse: string;
  due_dil_fee_for_depn_ls_than_sixteen: string;
  due_dil_fee_for_additional_depn_gt_than_or_eq_sixteen: string;
  legal_fee: string;
  govt_certificate_of_naturalization_fee: string;
  govt_passport_issuance_fee: string;
  govt_expedited_passport_issuance_fee: string;
  bank_and_courier_charges: string;
  local_agent_fee: string;
  fee_id: number;
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