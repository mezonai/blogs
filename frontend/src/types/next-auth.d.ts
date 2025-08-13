import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    refreshToken?: string;
    jwt?: string;
    user?: {
      id?: string | number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    refreshToken?: string;
    jwt?: string;
    id?: string | number;
    username?: string;
  }
}
