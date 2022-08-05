import type { inferProcedureOutput } from '@trpc/server';

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = InferQueryOutput<'hello'>
 */
export type InferQueryOutput<TRouteKey extends keyof AppRouter['_def']['queries']> =
  inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
