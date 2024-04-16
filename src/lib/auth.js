import { loginService } from '@/lib/actions/authAction/authService';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';
const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXTAUTH_MAX_AGE_TOKEN),
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: Number(process.env.NEXTAUTH_MAX_AGE_TOKEN),
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await loginService(email);

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (!passwordConfirm) {
            throw new Error('Email or Password is not valid');
          }
          if (!user.isEmailVerified) {
            throw new Error('Email has not been verified');
          }

          if (user.roleId == 2) {
            if (!user.organizations.isValidDocument) {
              throw new Error(
                'Document support organization has not been verification ',
              );
            }
          }
          return user;
        }
        throw new Error('Email or password is not valid');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger, user, session }) {
      if (account?.provider === 'credentials') {
        token.nickname = user.nickname;
        token.email = user.email;
        token.userId = user.userId;
        token.role = user.role.name;
        token.avatar = user.avatar;
      }
      if (trigger === 'update') {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        if (session.name) {
          token.name = session.name;
        }
        if (session.avatar) {
          token.avatar = session.avatar;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if ('nickname' in token) {
        session.user.nickname = token.nickname;
      }
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('userId' in token) {
        session.user.userId = token.userId;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('avatar' in token) {
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const nextAuth = NextAuth(authOptions);

export const getAuthServerSession = async () => {
  return await getServerSession(authOptions);
};
