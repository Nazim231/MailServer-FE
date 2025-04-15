import { useEffect, useState } from 'react';
import { makePostRequest, setAuthToken } from './axios';
import { ApiErrorResponse, ApiResponse, ApiSuccessResponse, SignupForm } from './types';
import { useNavigate } from 'react-router-dom';

export const TOKEN_KEY = 'mailServerAuthToken';
const useAuth = () => {
  const AUTH_STATUS_KEY = 'authenticated';

  const navigateTo = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem(TOKEN_KEY))
  }, []);

  // For Authentication
  const getAuthenticated = () => {
    const isAuthenticated = sessionStorage.getItem(AUTH_STATUS_KEY);
    return isAuthenticated === 'true';
  };

  const [isAuthenticated, setAuthenticated] = useState(getAuthenticated());

  const saveAuthenticated = (isAuthenticated: boolean) => {
    sessionStorage.setItem(AUTH_STATUS_KEY, String(isAuthenticated));
    setAuthenticated(isAuthenticated);
  };

  const attemptLogin = async (email: string, password: string) => {
    const credentials = { email, password };
    const response: ApiResponse = await makePostRequest('auth/login', credentials);
    if (response.success) {
      setAuthToken((response as ApiSuccessResponse).data.token);
      saveAuthenticated(true);
      return { success: true };
    } else {
      return { success: false, error: (response as ApiErrorResponse).error };
    }
  };

  const createAccount = async (userData: SignupForm) => {
    const response: ApiResponse = await makePostRequest('auth/signup', userData);
    if (response.success) {
      return await attemptLogin(userData.email, userData.password);
    } else {
      return { success: false, error: (response as ApiErrorResponse).error };
    }
  };

  const attemptLogout = () => {
    setAuthToken(null);
    saveAuthenticated(false);
    navigateTo('/login');
  };

  return {
    isAuthenticated,
    attemptLogin,
    attemptLogout,
    createAccount,
    tokenKey: TOKEN_KEY
  };
};

export default useAuth;
