/* WARNING:
This file is for developer testing. It is not intended for user interaction in
any way. There is possibly a better way of creating testing or experimentation 
scenarios like this (msw perhaps?) but for now we are doing it using this file.\
*/

import { createRouter } from '~/server/create-router';
import * as trpc from '@trpc/server';

export const developerRouter = createRouter().query('internalServerError500', {
  resolve: () => {
    throw new trpc.TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred, please try again later.',
    });
  },
});

export type DeveloperRouter = typeof developerRouter;
