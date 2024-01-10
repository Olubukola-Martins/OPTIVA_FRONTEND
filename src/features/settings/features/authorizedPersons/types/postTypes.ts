// GET INVESTMENT BY COUNTRY
export interface IInvestmentByCountry {
  id: number;
  investment_name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
}
// GET COUNTRY BY PROGRAM TYPE
export interface IProgramCountry {
  id: number;
  country_name: string;
  pivot: Pivot;
}

interface Pivot {
  programtype_id: number;
  country_id: number;
}
// FEES
export interface IGrenadaRealEstate {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  govt_sposeless_fee: number;
  govt_fee_for_family_of_four: number;
  govt_fee_for_additional_children: number;
  govt_fee_for_parents_ls_than_fifty_five: number;
  govt_fee_for_parents_gt_than_fifty_five: number;
  govt_fee_for_unmarried_siblings: number;
  govt_application_fee: number;
  due_dil_fee_for_main_applicant: number;
  due_dil_fee_for_spouse: number;
  due_dil_fee_for_add_depn_ls_than_or_eq_sixteen: number;
  due_dil_fee_for_add_depn_gt_than_seventeen: number;
  govt_prc_fee_for_main_applicant: number;
  govt_prc_fee_for_spouse: number;
  govt_prc_fee_for_add_dep_ls_than_or_eq_sixteen: number;
  govt_prc_fee_for_add_dep_gt_than_sixteen: number;
  govt_passport_and_oath_of_allegiance_fee: number;
  local_agent_fee_and_vat: number;
  real_estate_investment_for_family: number;
  bank_escrow_management_fee: number;
  legal_advisory_fee: number;
  id?:number
}

export interface IGrenadaDonation {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  govt_ntf_bution_for_family_ls_than_eq_four: number;
  govt_spouseless_fee: number;
  govt_ntf_bution_for_add_depn: number;
  govt_ntf_bution_for_parents_ls_than_fifty_five: number;
  govt_ntf_bution_for_parents_gt_than_fifty_five: number;
  govt_ntf_bution_for_unmarried_siblings: number;
  govt_ntf_application_fee: number;
  govt_due_dil_fee_for_main_applicant: number;
  govt_due_dil_fee_for_spouse: number;
  govt_due_dil_fee_for_depn_ls_than_or_eq_to_sixteen: number;
  govt_due_dil_fee_for_depn_seventeen_to_twenty_five: number;
  govt_prc_fee_for_main_applicant: number;
  govt_prc_fee_for_spouse: number;
  govt_prc_fee_for_add_depn_ls_than_eq_sixteen: number;
  govt_prc_fee_for_add_depn_gt_than_seventeen: number;
  grenada_bank_fees: number;
  govt_passport_and_oath_of_allegiance_fee: number;
  legal_advisory_fee: number;
  local_agent_fee_and_vat: number;
  id?:number
}

export interface IDominicaDonation {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  edf_bution_for_main_applicant: number;
  edf_bution_for_spouse: number;
  edf_bution_for_family_ls_than_eq_to_four: number;
  edf_bution_for_add_depn_ls_than_eighteen: number;
  edf_bution_for_add_depn_gt_than_eighteen: number;
  govt_processing_fee: number;
  due_dil_fee_for_main_applicant: number;
  due_dil_fee_for_spouse: number;
  due_dil_fee_for_depn_ls_than_sixteen: number;
  due_dil_fee_for_additional_depn_gt_than_or_eq_sixteen: number;
  legal_fee: number;
  govt_certificate_of_naturalization_fee: number;
  govt_passport_issuance_fee: number;
  govt_expedited_passport_issuance_fee: number;
  bank_and_courier_charges: number;
  local_agent_fee: number;
  id?:number
}

export interface IAntiguaBarbacudaDonation {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  bution_fee_for_applicants_ls_than_eq_to_four: number;
  bution_fee_for_applicants_eq_to_five: number;
  bution_fee_for_applicants_gt_than_eq_to_six: number;
  govt_prc_fee_for_family_of_four: number;
  govt_prc_fee_for_family_gt_than_four: number;
  due_dil_for_main_applicant: number;
  due_dil_for_spouse: number;
  due_dil_for_depn_zero_to_eleven: number;
  due_dil_for_depn_twelve_to_seventeen: number;
  due_dil_for_depn_gt_than_eighteen: number;
  due_dil_for_depn_gt_than_fifty_eight: number;
  goverment_passport_and_oath_of_allegiance_fee: number;
  legal_and_advisory_fee: number;
  id?: number;
}

export interface IAntiguaSingleRealEstate {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  real_estate_investment_fee: number;
  govt_prc_fee_for_family_of_four: number;
  govt_prc_fee_for_family_gt_than_four: number;
  due_dil_for_main_applicant: number;
  due_dil_for_spouse: number;
  due_dil_for_depn_zero_to_eleven: number;
  due_dil_for_depn_twelve_to_seventeen: number;
  due_dil_for_depn_gt_than_eighteen: number;
  due_dil_for_depn_gt_than_fifty_eight: number;
  goverment_passport_and_oath_of_allegiance_fee: number;
  land_transfer_tax: number;
  bank_and_escrow_fee: number;
  legal_and_advisory_fee: number;
  id?: number;
}

export interface IAntiguaJointRealEstate {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  real_estate_investment_fee: number;
  govt_prc_fee_for_family_of_four: number;
  govt_prc_fee_for_family_gt_than_four: number;
  due_dil_for_main_applicant: number;
  due_dil_for_spouse: number;
  due_dil_for_depn_zero_to_eleven: number;
  due_dil_for_depn_twelve_to_seventeen: number;
  due_dil_for_depn_gt_than_eighteen: number;
  due_dil_for_depn_gt_than_fifty_eight: number;
  goverment_passport_and_oath_of_allegiance_fee: number;
  land_transfer_tax: number;
  bank_and_escrow_fee: number;
  legal_and_advisory_fee: number;
  id?: number;
}

export interface IStKittsNevis {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  sgf_dona_for_principal_applicant: number;
  sgf_dona_for_spouse_or_other_dependent: number;
  sgf_dona_for_family_of_four: number;
  sgf_dona_for_additional_dependents_ls_than_eighteen: number;
  sgf_dona_for_additional_dependents_gt_than_eighteen: number;
  sgf_dona_application_fee: number;
  due_dil_and_prc_fee_for_main_applicant: number;
  due_dil_and_prc_fee_for_spouse: number;
  due_dil_and_prc_fee_for_children_zero_to_fifteen: number;
  due_dil_and_prc_fee_for_children_sixteen_to_eighteen: number;
  due_dil_and_prc_fee_for_children_gt_than_eighteen: number;
  due_dil_and_prc_fee_for_parents_gt_than_or_eq_sixty_five: number;
  due_dil_and_prc_fee_for_grand_parents_gt_than_or_eq_fifty_five: number;
  due_dil_and_prc_fee_for_siblings_zero_to_fifteen: number;
  due_dil_and_prc_fee_for_siblings_gt_than_or_eq_fifteen: number;
  govt_passport_and_oath_of_allegiance_fee: number;
  courier_fee_and_bank_transfer_fee: number;
  bank_due_dil_fee_for_principal_applicant: number;
  bank_due_dil_fee_for_spouse: number;
  bank_due_dil_fee_for_depn_ls_than_fifteen: number;
  bank_due_dil_fee_for_depn_gt_than_fifteen: number;
  legal_advisory_fee: number;
  local_agent_fee_and_vat: number;
  id?:number
}

export interface IStLucia {
  fee_name: string;
  country_id: number;
  program_type_id: number;
  investment_route_id: number;
  local_processing_fee: number;
  local_processing_fee_threshold_payment: number;
  local_processing_fee_balance_payment: number;
  program_threshold_payment: number;
  program_balance_payment: number;
  nefi_bution_for_main_applicant: number;
  nefi_bution_for_spouse: number;
  nefi_bution_for_add_depn: number;
  nefi_bution_for_more_depn: number;
  nefi_bution_for_add_depn_no_spouse: number;
  govt_prc_fee_for_main_applicant: number;
  govt_prc_fee_for_spouse: number;
  govt_prc_fee_for_add_depn: number;
  govt_due_dil_fee_for_main_applicant: number;
  govt_due_dil_fee_for_spouse: number;
  govt_due_dil_fee_for_depn_ls_than_sixteen: number;
  govt_due_dil_fee_for_depn_gt_than_sixteen: number;
  legal_and_advisory_fee: number;
  local_agent_and_vat_fee: number;
  passport_fee: number;
  id?:number
}

// SINGLE FEE
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

interface Grenadadonationfee {
  id: number;
  investment_route_id: number;
  country_id: number;
  govt_ntf_bution_for_family_ls_than_eq_four: string;
  govt_spouseless_fee: string;
  govt_ntf_bution_for_add_depn: string;
  govt_ntf_bution_for_parents_ls_than_fifty_five: string;
  govt_ntf_bution_for_parents_gt_than_fifty_five: string;
  govt_ntf_bution_for_unmarried_siblings: string;
  govt_ntf_application_fee: string;
  govt_due_dil_fee_for_main_applicant: string;
  govt_due_dil_fee_for_spouse: string;
  govt_due_dil_fee_for_depn_ls_than_or_eq_to_sixteen: string;
  govt_due_dil_fee_for_depn_seventeen_to_twenty_five: string;
  govt_prc_fee_for_main_applicant: string;
  govt_prc_fee_for_spouse: string;
  govt_prc_fee_for_add_depn_ls_than_eq_sixteen: string;
  govt_prc_fee_for_add_depn_gt_than_seventeen: string;
  grenada_bank_fees: string;
  govt_passport_and_oath_of_allegiance_fee: string;
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
  due_dil_fee_for_add_depn_gt_than_seventeen: string;
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

interface Stkittsnevisrealestatefee {
  id: number;
  investment_route_id: number;
  country_id: number;
  sgf_dona_for_principal_applicant: string;
  sgf_dona_for_spouse_or_other_dependent: string;
  sgf_dona_for_family_of_four: string;
  sgf_dona_for_additional_dependents_ls_than_eighteen: string;
  sgf_dona_for_additional_dependents_gt_than_eighteen: string;
  sgf_dona_application_fee: string;
  due_dil_and_prc_fee_for_main_applicant: string;
  due_dil_and_prc_fee_for_spouse: string;
  due_dil_and_prc_fee_for_children_zero_to_fifteen: string;
  due_dil_and_prc_fee_for_children_sixteen_to_eighteen: string;
  due_dil_and_prc_fee_for_children_gt_than_eighteen: string;
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

interface Dominicadonationfee {
  id: number;
  investment_route_id: number;
  country_id: number;
  edf_bution_for_main_applicant: string;
  edf_bution_for_spouse: string;
  edf_bution_for_family_ls_than_eq_to_four: string;
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

interface Antiguadonationfee {
  id: number;
  investment_route_id: number;
  country_id: number;
  bution_fee_for_applicants_ls_than_eq_to_four: string;
  bution_fee_for_applicants_eq_to_five: string;
  bution_fee_for_applicants_gt_than_eq_to_six: string;
  govt_prc_fee_for_family_of_four: string;
  govt_prc_fee_for_family_gt_than_four: string;
  due_dil_for_main_applicant: string;
  due_dil_for_spouse: string;
  due_dil_for_depn_zero_to_eleven: string;
  due_dil_for_depn_twelve_to_seventeen: string;
  due_dil_for_depn_gt_than_eighteen: string;
  due_dil_for_depn_gt_than_fifty_eight: string;
  goverment_passport_and_oath_of_allegiance_fee: string;
  legal_and_advisory_fee: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

interface Antiguasinglerealestatefee {
  id: number;
  investment_route_id: number;
  country_id: number;
  real_estate_investment_fee: string;
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
  land_transfer_tax: string;
  legal_and_advisory_fee: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

interface Antiguajointrealestatefee {
  id: number;
  investment_route_id: number;
  country_id: number;
  real_estate_investment_fee: string;
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
  land_transfer_tax: string;
  legal_and_advisory_fee: string;
  fee_id: number;
  created_at: string;
  updated_at: string;
}

export interface ISingleFee {
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
  st_lucia_nefi_real_estate_fee?: Stlucianefirealestatefee;
  antigua_donation_fee?: Antiguadonationfee;
  st_kitts_nevis_real_estate_fee?: Stkittsnevisrealestatefee;
  grenada_donation_fee?: Grenadadonationfee;
  dominica_donation_fee?: Dominicadonationfee;
  grenada_real_estate_fee?: Grenadarealestatefee;
  antigua_single_real_estate_fee?: Antiguasinglerealestatefee;
  antigua_joint_real_estate_fee?: Antiguajointrealestatefee;
}


// CURRENCY
export interface ICurrency {
  id: number;
  source_currency: string;
  target_currency: string;
  source_currency_amount: string;
  target_currency_amount: string;
  created_at: string;
  updated_at: string;
}

export interface IPostCurrency {
  source_currency: string;
  target_currency: string;
  source_currency_amount: number;
  target_currency_amount: number;
}