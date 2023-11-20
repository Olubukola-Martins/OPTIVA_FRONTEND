
interface Dependantcondition {
  other_condition: string;
}

interface Agedependant {
  age_bracket: string;
}
export interface IDependentsBody {
  dependant: string;
  age_dependants: Agedependant[];
  dependant_conditions: Dependantcondition[];
}

export interface IDocRequirementBody {
  document_name: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  other_requirement: string;
  eligible_dependants_id: number[];
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

