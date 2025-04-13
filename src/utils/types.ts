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