import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import prisma from 'clients/prisma';
import { createCardSchema } from 'utils/zod-schemas';

/* TODO: split up functions to be grouped by model and import here into root */

// FIXME is it possible to infer or build a validation schema, or part of, from PrismaClient model???

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
  .mutation('createCard', {
    input: createCardSchema,
    async resolve(req) {
      const card = await prisma.card.create({
        data: req.input,
      });

      return card;
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
