export interface IData {
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  documentrequirements: IDocumentrequirement[];
  eligibledependents: IEligibledependent[];
  milestones: IMilestone[];
}

export interface IMilestone {
  id: number;
  milestone: string;
  timeline: string;
  created_at: string;
  updated_at: string;
  programMilestoneId: IProgramMilestoneId;
}

export interface IProgramMilestoneId {
  programtype_id: number;
  milestone_id: number;
}

export interface IEligibledependent {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
  programDependentId: IProgramDependentId;
}

export interface IProgramDependentId {
  programtype_id: number;
  eligibledependant_id: number;
}

export interface IDocumentrequirement {
  id: number;
  name: string;
  document_category_id: number;
  document_format: string[];
  document_size: number;
  other_requirement: string;
  created_at: string;
  updated_at: string;
  programDocumentId: IProgramDocumentId;
}

export interface IProgramDocumentId {
  programtype_id: number;
  documentrequirement_id: number;
}



export interface ICountry{
  id: number;
  country_name: string;
  created_at: string;
  updated_at: string;
  programtypes: IProgramtype[];
}

interface IProgramtype {
  id: number;
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  created_at: string;
  updated_at: string;
  pivot: IPivot;
}

interface IPivot {
  country_id: number;
  programtype_id: number;
}