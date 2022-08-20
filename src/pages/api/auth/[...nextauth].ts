import { NextApiHandler } from 'next';
import NextAuth, { SessionStrategy, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '~/clients/prisma';

interface SessionCallbackParams {
  session: Session;
  token: JWT;
}

interface JwtCallbackParams {
  user?: User;
  token: JWT;
}

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  /* These callbacks have been modified so that the user model id is included
  when using useSession. This allows us to easily send the signed in user id to
  via a json payload in a HTTP request */
  callbacks: {
    session: async ({ session, token }: SessionCallbackParams) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: JwtCallbackParams) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
};

// TODO convert to use tRPC pattern
export default function authHandler(req: any, res: any): NextApiHandler {
  return NextAuth(req, res, options);
}
