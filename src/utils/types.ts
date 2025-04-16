export type Credentials = {
    email: string;
    password: string;
  };

export type SignupForm = Credentials & {
    name: string;
    confirmPassword: string;
  };

export type Errors<T> = {
    [key in keyof T]?: string;
} & { global?: string };

export type ApiResponse = { success: boolean };

export type ApiSuccessResponse = ApiResponse & { data: any };

export type ApiErrorResponse = ApiResponse & { error: string };

export type MailList = {
  id: number;
  from_name: string;
  snippet: string;
  created_at: Date;
}

export type Mail = {
  id: number;
  from_name: string;
  from_email: string;
  subject: string;
  body_html: string;
  body_text: string;
  snippet: string;
  sent_datetime: Date;
  is_read: boolean;
  created_at: Date;
}