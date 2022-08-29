import { z } from 'zod';
import { createRouter } from '~/server/create-router';

export const decksRouter = createRouter().mutation('create', {
  input: z.object({
    title: z.string(),
    description: z.string().nullish(),
    projectId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const deck = await ctx.prisma.deck.create({
      data: input,
    });

    return deck;
  },
});

export type DecksRouter = typeof decksRouter;
