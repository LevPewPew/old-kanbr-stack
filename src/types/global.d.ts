export {};

declare global {
  /* To be used when data is expected that could be null. It is a convenience to
  give as a React component props' type, avoiding nullish coalescing when making
  that prop a more typical "optional" type with a question mark */
  type nullish = null | undefined;
}
