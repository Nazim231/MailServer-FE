import { Errors, SignupForm } from "./types";

export function validateEmailPassword(email: string, password: string): { success: boolean; error: { email?: string; password?: string } } {
  const errors: { email?: string; password?: string } = {};

  // Validate email
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email format.';
  }

  // Validate password
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  // Determine success
  const success = Object.keys(errors).length === 0;

  return { success, error: errors };
}

export function validateSignupForm(formData: SignupForm): { success: boolean; error: Errors<SignupForm> } {
  const errors: Errors<SignupForm> = {};
  const { name, email, password, confirmPassword } = formData;
  // Validate name
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters long.';
  }
  // Validate email
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email format.';
  }
  // Validate password
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }
  // Validate confirm password
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  // Determine success
  const success = Object.keys(errors).length === 0;
  return { success, error: errors };
}

// Utility function to validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}                         