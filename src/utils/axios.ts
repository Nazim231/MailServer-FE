import axios, { AxiosRequestConfig } from 'axios';
import { ApiSuccessResponse, ApiErrorResponse } from './types';
import { TOKEN_KEY as tokenKey } from './useAuth';

const axiosInstance = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'],
});

export async function makeGetRequest(url: string, config?: AxiosRequestConfig<any>): Promise<ApiSuccessResponse | ApiErrorResponse> {
  try {
    const response = await axiosInstance.get(url, config);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message ?? error.message };
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
    return { success: false, error: error.response?.data?.message ?? error.message };
  }
}

export function setAuthToken(token: string | null) {
  localStorage.setItem(tokenKey, token || '');

  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}
