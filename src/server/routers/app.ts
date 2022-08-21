import { transformer } from '~/server/transformer';
import { createRouter } from '~/server/create-router';
import { cardsRouter } from './cards';
import { developerRouter } from './developer';
import { usersRouter } from './users';

export const appRouter = createRouter()
  .transformer(transformer)
  .merge('card.', cardsRouter) // FIXME change to plural
  .merge('dev.', developerRouter)
  .merge('users.', usersRouter);
export type AppRouter = typeof appRouter;
