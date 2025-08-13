import {
  confirmChangeNewEmail,
  getUserInfo,
  updateUserEmail,
  updateUserInfo,
} from '@/services/user.service';
import { AxiosErrorResponse } from '@/shared/types/axiosResponse';
import { User } from '@/shared/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfo,
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation<User, AxiosErrorResponse, Partial<User>>({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
    },
  });
};

export const useUpdateUserEmail = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    AxiosErrorResponse,
    { id: number; email: string; password: string }
  >({
    mutationFn: updateUserEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
    },
  });
};

export const useGetUserInfoClient = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: async (): Promise<User> => {
      const res = await fetch('/api/user/me');

      if (!res.ok) {
        throw new Error('Failed to fetch user info');
      }

      return await res.json();
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useConfirmChangeNewEmail = (token: string) => {
  return useQuery({
    queryKey: ['confirm-email-change', token],
    queryFn: () => confirmChangeNewEmail(token),
    enabled: !!token,
  });
};
