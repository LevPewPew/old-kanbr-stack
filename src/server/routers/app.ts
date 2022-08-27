import { transformer } from '~/server/transformer';
import { createRouter } from '~/server/create-router';
import { cardsRouter } from './cards';
import { decksRouter } from './decks';
import { developerRouter } from './developer';
import { projectsRouter } from './projects';
import { usersRouter } from './users';

export const appRouter = createRouter()
  .transformer(transformer)
  .merge('cards.', cardsRouter)
  .merge('dev.', developerRouter)
  .merge('users.', usersRouter)
  .merge('projects.', projectsRouter)
  .merge('decks.', decksRouter);
export type AppRouter = typeof appRouter;
