import { z } from 'zod';
import { createRouter } from '~/server/create-router';

/* TODO: split up functions to be grouped by model and import here into root */

/* TODO:
Is it better to just create generic CRUD controllers, and let consumer decide 
what to do with it to achieve goal? Or is it better to create specific use case
controllers as needed to achieve the goal? Maybe have both (a set of crud + some
specific functions as "helpers". maybe even split them up and merge them in here
before exporting to app router)?

Ask this on Stack Overflow.
*/
export const usersRouter = createRouter().mutation('assignToCard', {
  input: z.object({
    cardId: z.string(),
    userId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { cardId, userId } = input;

    const card = await ctx.prisma.user.update({
      where: { id: userId },
      data: {
        cardId,
      },
    });

    return card;
  },
});

export type UsersRouter = typeof usersRouter;
