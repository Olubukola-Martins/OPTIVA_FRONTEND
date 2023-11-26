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

interface IDocumentRequirement {
  id: number;
  name: string;
  document_type: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
  eligible_dependants: Eligibledependant[];
  document_category: Documentcategory;
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
  pivot: Pivot;
}

interface Pivot {
  document_requirement_id: number;
  eligible_dependant_id: number;
}