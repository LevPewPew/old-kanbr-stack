import type { DefaultUser } from 'next-auth';

declare global {
  /* To be used when data is expected that could be null. It is a convenience to
  give as a React component props' type, avoiding nullish coalescing when making
  that prop a more typical "optional" type with a question mark */
  type nullish = null | undefined;
}

/* The Session and JWT interfaces from next-auth are extended so that it matches
what we now expect due to the changes in callbacks in the authHandler */

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt/types' {
  interface JWT {
    uid: string;
  }
}
