interface Dependantcondition {
  other_condition: string;
}

interface Agedependant {
  age_bracket: string;
}
export interface IDependentsBody {
  dependant: string;
  age_dependants: Agedependant[];
  dependant_conditions: Dependantcondition[] | undefined;
}

export interface IDocRequirementBody {
  name: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  document_type: string;
  other_requirement: string;
  eligible_dependants: number[];
}

interface Level {
  duration: number;
  role_id: number;
  employee_id: number;
}
export interface IEscalationBody {
  escalation_name: string;
  role_id: number;
  task: string;
  deadline: number;
  reminder_frequency: number;
  levels: Level[];
}

// AllEligibleDependentsResponse;
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

interface AllEligiDependentsDatum {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
  age_brackets: AllEligiDependentsAgebracket[];
  other_conditions: AllEligiDependentsOthercondition[];
}

interface AllEligiDependentsOthercondition {
  id: number;
  other_condition: string;
  eligible_dependant_id: number;
  created_at: string;
  updated_at: string;
}

interface AllEligiDependentsAgebracket {
  id: number;
  age_bracket: string;
  eligible_dependant_id: number;
  created_at: string;
  updated_at: string;
}

export interface IAllEligiDependentsResponse {
  data: AllEligiDependentsDatum[];
  links: Links;
  meta: Meta;
}

// SingleEligibleDependent;
export interface ISingleEligibleDependent {
  success: boolean;
  data: AllEligiDependentsDatum;
  message: string;
  meta: any[] | [];
}

//All Doc Requirement response
interface IAllDocRequirementDocumentcategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface IAllDocRequirementEligibledependant {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
  pivot: IAllDocRequirementPivot;
}

interface IAllDocRequirementDatum {
  id: number;
  name: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  document_type: string;
  other_requirement: string;
  created_at: string;
  updated_at: string;
  eligible_dependants: IAllDocRequirementEligibledependant[];
  document_category: IAllDocRequirementDocumentcategory;
}

interface IAllDocRequirementPivot {
  document_requirement_id: number;
  eligible_dependant_id: number;
}

export interface IAllDocRequirementData {
  data: IAllDocRequirementDatum[];
  links: Links;
  meta: Meta;
}
// Single Documet Requirement;
export interface ISingleDocRequirement {
  success: boolean;
  data: IAllDocRequirementDatum;
  message: string;
  meta: any[] | [];
}

// All Escalations
 interface IAllEscalationsDatum {
  accepted: number;
  active: string;
  created_at: string;
  current_level: number;
  deadline: number;
  employee_id: number | null ;
  escalation_name: string;
  expiration_time: string;
  id: number;
  levels:any[]
  reminder_frequency: number;
  role_id: number;
  task: string;
  updated_at: string;
}
export interface IAllEscalationsData {
  data: IAllEscalationsDatum[]
}