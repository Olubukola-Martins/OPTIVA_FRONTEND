import { IUserToken } from "src/types";

export interface ITemplate {
  id: number;
  template_name: string;
  template_description: string;
  created_at: string;
  updated_at: string;
}


// interface ISection {
//   section_title: string;
//   section_description: string;
//   subsections?: Subsection[];
//   form_questions?: Formquestion2[];
// }

interface Formquestion2 {
  question: string;
  input_type: string;
  is_required: boolean;
  options?: any;
}

interface Subsection {
  subsection_title: string;
  subsection_description: string;
  form_questions: Formquestion[];
}

interface Formquestion {
  question: string;
  input_type: string;
  is_required: boolean;
  options?: string[];
}


// POST TYPE
export interface IPostApplication extends IUserToken {
  template_name: string;
  template_description: string;
  sections: Section[]; 
}

interface Section {
  section_title: string;
  section_description: string;
  subsections?: Subsection[];
  form_questions?: Formquestion2[];
}

interface Formquestion2 {
  question: string;
  input_type: string;
  is_required: boolean;
  options?: any;
}

interface Subsection {
  subsection_title: string;
  subsection_description: string;
  form_questions: Formquestion[];
}

interface Formquestion {
  question: string;
  input_type: string;
  is_required: boolean;
  options?: string[];
}


