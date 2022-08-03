import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput } from '@trpc/server';
import superjson from 'superjson';
import type { AppRouter } from '~/pages/api/trpc/[trpc]';

const trpc = createReactQueryHooks<AppRouter>();

export const transformer = superjson;

export default trpc;

/* TODO do i need this??? */
/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
