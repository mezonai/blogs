import {
  emailConfirmation,
  forgotPassword,
  register,
  resetPassword,
  updateUserPassword,
} from '@/services/auth.service';
import { AxiosErrorResponse } from '@/shared/types/axiosResponse';
import { AuthResponse, RegisterPayload } from '@/shared/types/user';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const useRegister = (): UseMutationResult<
  AuthResponse,
  AxiosErrorResponse,
  RegisterPayload
> =>
  useMutation<AuthResponse, AxiosErrorResponse, RegisterPayload>({
    mutationFn: register,
  });

export const useResetPassword = () =>
  useMutation<
    void,
    AxiosErrorResponse,
    {
      code: string;
      password: string;
      passwordConfirmation: string;
    }
  >({
    mutationFn: resetPassword,
  });

export const useUpdatePassword = () =>
  useMutation<
    void,
    AxiosErrorResponse,
    {
      currentPassword: string;
      password: string;
      passwordConfirmation: string;
    }
  >({
    mutationFn: updateUserPassword,
  });

export const useSendEmailConfirmation = () =>
  useMutation<void, AxiosErrorResponse, { email: string }>({
    mutationFn: ({ email }) => emailConfirmation(email),
  });

export const useRequestResetPassword = () =>
  useMutation<void, AxiosErrorResponse, { email: string }>({
    mutationFn: ({ email }) => forgotPassword(email),
  });
