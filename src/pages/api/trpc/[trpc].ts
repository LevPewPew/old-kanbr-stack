import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '~/server/routers/app';
import { prisma } from '~/clients';
import { createContext } from '~/server/context';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  teardown: () => prisma.$disconnect(),
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    }
  },
});
