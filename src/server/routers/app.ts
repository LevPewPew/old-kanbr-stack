import { z } from 'zod';
import { createRouter } from '~/pages/api/trpc/[trpc]';
import { cardFormSchema } from '~/components/card-form';

/* TODO: split up functions to be grouped by model and import here into root */

export const appRouter = createRouter()
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
  .mutation('create', {
    input: cardFormSchema,
    async resolve({ ctx, input }) {
      const card = await ctx.prisma.card.create({
        data: input,
      });

      return card;
    },
  });

export type AppRouter = typeof appRouter;
