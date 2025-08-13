import { ROUTES } from '@/shared/constants';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';
import { toast } from 'sonner';
import { authOptions } from './auth';
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const isClientSide = typeof window !== 'undefined';
let axiosClient: AxiosInstance | undefined = undefined;
let refreshPromise: Promise<string> | null = null;
export const getTokenServer = async (): Promise<string | undefined> => {
  let token: string | undefined;
  try {
    const session = await getServerSession(authOptions);
    token = session?.jwt;
  } catch (error) {
    console.log(error);
    console.info('There is no token');
  }
  return token;
};

export const getAxiosClient = () => {
  if (axiosClient && isClientSide) return axiosClient;
  axiosClient = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosClient.interceptors.request.use(
    async (config) => {
      let token = undefined;
      if (isClientSide) {
        token = localStorage.getItem('jwt');
      } else {
        token = await getTokenServer();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const { status } = error.response || {};

      if (!isClientSide) {
        return Promise.reject(error);
      }

      if (status === 401) {
        const originalRequest = error.config as CustomAxiosRequestConfig;
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          localStorage.clear();
          window.location.href = ROUTES.LOGIN;
        }
        try {
          if (!refreshPromise) {
            refreshPromise = getRefreshToken();
            refreshPromise.finally(() => {
              refreshPromise = null;
            });
          }
          const newToken = await refreshPromise;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          if (axiosClient) {
            return axiosClient(originalRequest);
          }
          throw new Error('Failed to refresh token');
        } catch (error: unknown) {
          console.error('Failed to refresh token:', error);
          localStorage.clear();
          window.location.href = ROUTES.LOGIN;
        }
      }

      switch (status) {
        case 500:
          toast.error('Something went wrong');
          break;
        default:
          toast.error(error.message || 'Unknown error');
      }

      return Promise.reject(error);
    },
  );

  return axiosClient;
};

const getRefreshToken = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/api/auth/local/refresh`,
      { refreshToken: localStorage.getItem('refreshToken') },
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    console.error('Failed to refresh token:', err);
    throw err;
  }
};
