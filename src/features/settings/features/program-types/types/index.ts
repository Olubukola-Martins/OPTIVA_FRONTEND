export interface IProgram{
  id: number;
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  created_at: string;
  updated_at: string;
  eligibledependents: Eligibledependent[];
  milestones: Milestone[];
  documentrequirements: Documentrequirement[];
  applicationtemplate: Applicationtemplate;
  workflow: Workflow;
  countries: Country[];
}

interface Country {
  id: number;
  country_name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot4;
}

interface Pivot4 {
  programtype_id: number;
  country_id: number;
}

interface Workflow {
  id: number;
  name: string;
  branch_id: number;
  created_at: string;
  updated_at: string;
}

interface Applicationtemplate {
  id: number;
  template_name: string;
  template_description: string;
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
  pivot: Pivot3;
}

interface Pivot3 {
  programtype_id: number;
  documentrequirement_id: number;
}

interface Milestone {
  id: number;
  milestone: string;
  timeline: string;
  duration_type: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

interface Pivot2 {
  programtype_id: number;
  milestone_id: number;
}

interface Eligibledependent {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  programtype_id: number;
  eligibledependant_id: number;
}

export interface IMilestone {
  id: number;
  milestone: string;
  timeline: string;
  duration_type: string;
  created_at: string;
  updated_at: string;
  processes: IProcess[];
}

interface IProcess {
  id: number;
  title: string;
  duration: number;
  duration_type: string;
  milestone_id: number;
  created_at: string;
  updated_at: string;
}


// COUNTRY
export interface IPutCountry {
  country_name: string;
  created_at: string;
  id: number;
  updated_at: string;
}
export interface ICountry {
  id: number;
  country_name: string;
  created_at: string;
  updated_at: string;
  programtypes: IProgramtype[];
}

export interface IProgramtype {
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

// SINGLE PROGRAM TYPE
export interface IGetSingleProgramType{
  id: number;
  program_name: string;
  program_link: string;
  template_id: number;
  workflow_id: number;
  created_at: string;
  updated_at: string;
  eligibledependents: Eligibledependent[];
  milestones: Milestone[];
  countries: Country[];
  documentrequirements: Documentrequirement[];
  applicationtemplate: Applicationtemplate;
  workflow: Workflow;
}

interface Workflow {
  id: number;
  name: string;
  branch_id: number;
  created_at: string;
  updated_at: string;
}

interface Applicationtemplate {
  id: number;
  template_name: string;
  template_description: string;
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
  pivot: Pivot4;
}

interface Pivot4 {
  programtype_id: number;
  documentrequirement_id: number;
}

interface Country {
  id: number;
  country_name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot3;
}

interface Pivot3 {
  programtype_id: number;
  country_id: number;
}

interface Milestone {
  id: number;
  milestone: string;
  timeline: string;
  duration_type: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot2;
}

interface Pivot2 {
  programtype_id: number;
  milestone_id: number;
}

interface Eligibledependent {
  id: number;
  dependant: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

interface Pivot {
  programtype_id: number;
  eligibledependant_id: number;
}
// SINGLE PROGRAM TYPE
// export interface IGetSingleProgramType {
//   id: number;
//   program_name: string;
//   program_link: string;
//   template_id: number;
//   workflow_id: number;
//   created_at: string;
//   updated_at: string;
//   eligibledependents: Eligibledependent[];
//   milestones: Milestone[];
//   documentrequirements: Documentrequirement[];
//   applicationtemplate: Applicationtemplate;
//   workflow: Workflow;
// }

// interface Workflow {
//   id: number;
//   name: string;
//   branch_id: number;
//   created_at: string;
//   updated_at: string;
// }

// interface Applicationtemplate {
//   id: number;
//   template_name: string;
//   template_description: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Documentrequirement {
//   id: number;
//   name: string;
//   document_type: string;
//   document_category_id: number;
//   document_format: string[];
//   document_size: number;
//   other_requirement: string;
//   created_at: string;
//   updated_at: string;
//   pivot: Pivot3;
// }

// interface Pivot3 {
//   programtype_id: number;
//   documentrequirement_id: number;
// }

// interface Milestone {
//   id: number;
//   milestone: string;
//   timeline: string;
//   created_at: string;
//   updated_at: string;
//   pivot: Pivot2;
// }

// interface Pivot2 {
//   programtype_id: number;
//   milestone_id: number;
// }

// interface Eligibledependent {
//   id: number;
//   dependant: string;
//   created_at: string;
//   updated_at: string;
//   pivot: Pivot;
// }

// interface Pivot {
//   programtype_id: number;
//   eligibledependant_id: number;
// }


// SINGLE MILESTONE
export interface ISingleMilestone {
  id: number;
  milestone: string;
  timeline: string;
  duration_type: string;
  created_at: string;
  updated_at: string;
  processes: Process[];
}

interface Process {
  id: number;
  title: string;
  duration: number;
  duration_type: string;
  milestone_id: number;
  created_at: string;
  updated_at: string;
}
