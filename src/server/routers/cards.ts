import { createRouter } from '~/server/create-router';
import { cardFormSchema } from '~/components/card-form';

/* TODO: split up functions to be grouped by model and import here into root */

export const cardsRouter = createRouter().mutation('create', {
  input: cardFormSchema,
  async resolve({ ctx, input }) {
    const card = await ctx.prisma.card.create({
      data: input,
    });

    return card;
  },
});

export type CardsRouter = typeof cardsRouter;
