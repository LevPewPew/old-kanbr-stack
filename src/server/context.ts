import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import { prisma } from '~/clients';

/* NOTE: if needs be re-used for `getStaticProps()`, may need to change options
object to be optional. like so: `(options?: trpcNext.CreateNextContextOptions)` */
export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  const session = await getSession({ req });

  console.log(`createContext for user. Username: ${session?.user?.name ?? 'UNKNOWN'}`);

  return {
    req,
    res,
    prisma,
    session,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
