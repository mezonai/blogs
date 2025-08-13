export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const HEADER_TABS = [
  {
    label: 'ホーム',
    path: ROUTES.HOME,
  },
];

export const AUTH_STATUS = {
  UNAUTHENTICATED: 'unauthenticated',
  AUTHENTICATED: 'authenticated',
  LOADING: 'loading',
};
