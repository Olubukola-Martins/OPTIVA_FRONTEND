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

interface IDependent {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
  age_brackets: Agebracket[];
  other_conditions: Othercondition[];
}

interface Othercondition {
  id: number;
  other_condition: string;
  eligible_dependant_id: number;
  created_at: string;
  updated_at: string;
}

interface Agebracket {
  id: number;
  age_bracket: string;
  eligible_dependant_id: number;
  created_at: string;
  updated_at: string;
}