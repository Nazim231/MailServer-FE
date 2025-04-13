import axios, { AxiosRequestConfig } from 'axios';
import { ApiSuccessResponse, ApiErrorResponse } from './types';
import useAuth from './useAuth';

const axiosInstance = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
});

export async function makeGetRequest(url: string, config?: AxiosRequestConfig<any>): Promise<ApiSuccessResponse | ApiErrorResponse> {
  try {
    const response = await axiosInstance.get(url, config);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function makePostRequest(
  url: string,
  data: any,
  config?: AxiosRequestConfig<any>
): Promise<ApiSuccessResponse | ApiErrorResponse> {
  try {
    const response = await axiosInstance.post(url, data, config);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function setAuthToken(token: string | null) {
  const { tokenKey } = useAuth();

  localStorage.setItem(tokenKey, token || '');
  if (!axiosInstance.defaults.headers.options || token === null) {
    axiosInstance.defaults.headers.options = {};
  }
  axiosInstance.defaults.headers.options.Authorization = `Bearer ${token}`;
}
