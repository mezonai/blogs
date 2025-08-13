import { ROUTES } from '@/shared/constants';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import type { NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Strapi',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const data = (
            await axios.post(`${API_URL}/api/auth/local`, {
              identifier: credentials.identifier,
              password: credentials.password,
              requestRefresh: true,
            })
          ).data;

          if (!data?.user || !data?.jwt) return null;

          return {
            id: data.user.id.toString(),
            name: data.user.username,
            email: data.user.email,
            jwt: data.jwt,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error('Strapi login error', error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | undefined }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.refreshToken = user.refreshToken;
        return token;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token.jwt as string);
        if (!decoded.exp) {
          return token;
        }
        const isExpired = decoded.exp * 1000 < Date.now();
        if (!isExpired) return token;
        const res = await axios.post(
          `${API_URL}/api/auth/local/refresh`,
          { refreshToken: token.refreshToken },
          { withCredentials: true },
        );

        const newToken = res.data?.jwt;
        if (newToken) {
          token.jwt = newToken;
        }

        return token;
      } catch (err) {
        console.error('JWT refresh error in callback:', err);
        return token;
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.jwt = token.jwt as string;
      session.refreshToken = token.refreshToken as string;

      if (session.user) {
        session.user.id = token.id as string | number | undefined;

        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },

  pages: {
    signIn: ROUTES.LOGIN,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
