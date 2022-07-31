/* Alias and helper style types go in here. Not to be confused with
utility types.

TODO make the types in this file and only this file global */

/* To be used when data is expected that could be null. It is a convenience to
give as a React component props' type, avoiding nullish coalescing when making
that prop a more typical "optional" type with a question mark */
export type nullish = null | undefined;
