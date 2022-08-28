import { createRouter } from '~/server/create-router';
import { z } from 'zod';

export const cardsRouter = createRouter().mutation('create', {
  input: z.object({
    title: z.string().min(1, { message: 'Required' }),
    deckId: z.string(),
    description: z.string().nullish(),
    status: z
      .union([z.literal('READY'), z.literal('IN_PROGRESS'), z.literal('COMPLETE')])
      .optional(), // FIXME create array ouy of union type from CardStatus from prisma client, refer to my obsidian note
  }),
  async resolve({ ctx, input }) {
    const card = await ctx.prisma.card.create({
      data: input,
    });

    return card;
  },
});

export type CardsRouter = typeof cardsRouter;
