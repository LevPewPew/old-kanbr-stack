import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { appRouter as rootRouter } from 'server/routers/app';

// TODO see if declaring it here instead of importing from another file fixes the "new package installation breaks @prisma/client" issue
const prisma = new PrismaClient();

// create context based of incoming request
// set as optional here so it can also be re-used for `getStaticProps()`
export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  return {
    req: opts?.req,
    prisma,
    // task: prisma.task, // TODO do i want these "shortcuts?" hmmm
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
      // send to bug reporting
      console.error('Something went wrong', error);
    }
  },
});
