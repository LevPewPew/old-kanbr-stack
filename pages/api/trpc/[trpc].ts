import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import superjson from 'superjson';
import { appRouter as rootRouter } from 'server/routers/app';
import { prisma } from '~/clients';

/* NOTE: if needs be re-used for `getStaticProps()`, may need to change options
object to be optional.
like so: `opts?: trpcNext.CreateNextContextOptions`
*/
export const createContext = async ({ req, res }: trpcNext.CreateNextContextOptions) => {
  const session = await getSession({ req });

  console.log('createContext for user. Username: ', session?.user?.name ?? 'UNKNOWN');

  return {
    req,
    res,
    prisma,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
// FIXME this should be a resources name not root
const router = createRouter().transformer(superjson).merge('card.', rootRouter);

export const appRouter = router;
export type AppRouter = typeof router;

export default trpcNext.createNextApiHandler({
  router,
  createContext,
  teardown: () => prisma.$disconnect(),
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});
