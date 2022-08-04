import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { appRouter as rootRouter } from 'server/routers/app';
import { prisma } from '~/clients';

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (options?: trpcNext.CreateNextContextOptions) => {
  const ctx = {
    req: options?.req,
    prisma,
  };

  return ctx;
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
