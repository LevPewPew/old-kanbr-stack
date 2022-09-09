import type { DefaultUser } from 'next-auth';

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
