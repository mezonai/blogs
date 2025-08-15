export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FAQ: 'faq',
};

export const HEADER_TABS = [
  {
    label: 'ホーム',
    path: ROUTES.HOME,
  },
  {
    label: 'FAQ',
    path: ROUTES.FAQ,
  },
];

export const AUTH_STATUS = {
  UNAUTHENTICATED: 'unauthenticated',
  AUTHENTICATED: 'authenticated',
  LOADING: 'loading',
};
