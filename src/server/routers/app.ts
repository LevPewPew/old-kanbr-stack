import { transformer } from '~/server/transformer';
import { createRouter } from '~/server/create-router';
import { cardsRouter } from './cards';

export const appRouter = createRouter().transformer(transformer).merge('card.', cardsRouter);
export type AppRouter = typeof appRouter;
