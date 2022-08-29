import { z } from 'zod';
import { createRouter } from '~/server/create-router';

const createDeckSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
  projectId: z.string(),
});

export const decksRouter = createRouter().mutation('create', {
  input: createDeckSchema,
  async resolve({ ctx, input }) {
    const deck = await ctx.prisma.deck.create({
      data: input,
    });

    return deck;
  },
});

export type DecksRouter = typeof decksRouter;
