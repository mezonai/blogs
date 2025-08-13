import { getAxiosClient } from '@/lib/axiosClient';
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '@/shared/types/user';

const apiClient = getAxiosClient();
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await apiClient.post('/auth/local', payload);
  return res.data;
};

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const res = await apiClient.post('/auth/local/register', payload);
  return res.data;
};

export const updateUserPassword = async ({
  currentPassword,
  password,
  passwordConfirmation,
}: {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}): Promise<void> => {
  await apiClient.post('/auth/change-password', {
    currentPassword,
    password,
    passwordConfirmation,
  });
};

export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};

export const emailConfirmation = async (email: string): Promise<void> => {
  await apiClient.post('/auth/send-email-confirmation', { email });
};

export const resetPassword = async ({
  code,
  password,
  passwordConfirmation,
}: {
  code: string;
  password: string;
  passwordConfirmation: string;
}): Promise<void> => {
  await apiClient.post('/auth/reset-password', {
    code,
    password,
    passwordConfirmation,
  });
};
