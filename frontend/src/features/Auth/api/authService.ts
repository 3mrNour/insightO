import api from '@/shared/api/axiosApi';
import type { LoginPayload, RegisterPayload, AuthResponse, ApiMessage } from '../types';

export const loginUser = async (
  credentials: LoginPayload,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', credentials);
  return response.data;
};

export const registerUser = async (
  userData: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register', userData);
  return response.data;
};

export const sendRegisterOtp = async (email: string): Promise<ApiMessage> => {
  const response = await api.post<ApiMessage>('/register/send-otp', { email });
  return response.data;
};

export const verifyRegisterOtp = async (
  email: string,
  otp: string,
): Promise<ApiMessage> => {
  const response = await api.post<ApiMessage>('/register/verify-otp', { email, otp });
  return response.data;
};
