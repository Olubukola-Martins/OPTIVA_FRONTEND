export interface loginProps {
    email: string;
    password: string;
  }

export interface forgotPasswordProps {
  email: string;
}

export interface resetPasswordProps {
  token: string | null;
  email: string | null;
  password: string;
  password_confirmation: string;
}