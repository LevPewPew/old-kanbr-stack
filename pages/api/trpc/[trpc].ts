import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import prisma from '~/clients/prisma';
import { cardFormSchema } from '~/components/card-form';

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
  .mutation('createCard', {
    input: cardFormSchema,
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

// LEFTOFF deployed trpc is busted, only for https://kanbr.vercel.app/projects/decks/cards route. fix.
// it might be corrupted data or something? which is weird since i am just doing prisma db push.
