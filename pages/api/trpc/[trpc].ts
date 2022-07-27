import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import prisma from 'clients/prisma';

/* TODO: split up functions to be grouped by model and import here into root */

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'World'}`,
      };
    },
  })
  .mutation('createTicket', {
    input: z.object({ title: z.string(), description: z.string().nullish() }),
    async resolve(req) {
      const ticket = await prisma.ticket.create({
        data: req.input,
      });

      return ticket;
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
