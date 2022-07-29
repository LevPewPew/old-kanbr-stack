import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from 'pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();

// TODO move this/these file/s to index pattern
