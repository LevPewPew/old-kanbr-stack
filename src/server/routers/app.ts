import { transformer } from '~/server/transformer';
import { createRouter } from '~/server/create-router';
import { cardsRouter } from './cards';
import { usersRouter } from './users';

export const appRouter = createRouter()
  .transformer(transformer)
  .merge('card.', cardsRouter) // FIXME change to plural
  .merge('users.', usersRouter);
export type AppRouter = typeof appRouter;
