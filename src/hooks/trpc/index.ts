import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '~/server/routers/app';

export const {
  useContext,
  useDehydratedState,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useSubscription,
} = createReactQueryHooks<AppRouter>();
