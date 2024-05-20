export interface IAppTemplate {
  id: number;
  template_name: string;
  template_description: string;
  created_at: string;
  updated_at: string;
}
// SINGLE APPLICATION TEMPLATE
export interface ISingleAppTemplate {
  id: number;
  template_name: string;
  template_description: string;
  created_at: string;
  updated_at: string;
}

// POST TEMPLATE NAME TYPE
export interface IAppTemplateName {
  template_name: string;
  template_description: string;
}

// POST QUESTIONS
export interface IAppTemplateQuestions {
  template_id: number;
  questions: Question[];
  subsection_name?: string;
}

interface Question {
  form_question: string;
  input_type: string;
  subsection_name?: string;
  options?: string[];
  is_required:boolean
}

// GET TEMPLATE QUESTIONS

export interface ISingleQuestion {
  id: number;
  template_id?: any;
  form_question: string;
  input_type: string;
  options?: string[];
  is_required: number;
  section_name: string;
  subsection_name: string;
  schema_name: string;
  created_at: string;
  updated_at: string;
}

// UPDATE QUESTIONS
export interface IUpdateTemplateQuestion {
  form_question: string;
  input_type: string;
  template_id: number;
  is_required: boolean;
}