import { getAxiosClient } from '@/lib/axiosClient';
import { User } from '@/shared/types/user';

const apiClient = getAxiosClient();

export const getUserInfo = async (): Promise<User> => {
  const res = await apiClient.get('/users/me');
  return res.data;
};

export const getUserByEmail = async (email: string): Promise<User[]> => {
  const response = await apiClient.get('/users', {
    params: {
      filters: {
        email: {
          $eq: email,
        },
      },
    },
  });

  return response.data;
};

export const updateUserInfo = async (payload: Partial<User>): Promise<User> => {
  const res = await apiClient.put(`/users/${payload.id}`, payload);
  return res.data;
};

export const getUserInfoClient = async (): Promise<User> => {
  const response = await apiClient.get('/users/me');

  return response.data;
};

export const updateUserEmail = async ({
  id,
  email,
  password,
}: {
  id: number;
  email: string;
  password: string;
}): Promise<void> => {
  const res = await apiClient.put(
    `/users-permissions/${id}/request-email-update`,
    {
      email,
      password,
    },
  );
  return res.data;
};

export const confirmChangeNewEmail = async (token: string): Promise<void> => {
  const res = await apiClient.get('/users-permissions/confirm-email-change', {
    params: { token },
  });

  return res.data;
};
