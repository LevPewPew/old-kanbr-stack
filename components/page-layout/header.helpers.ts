import { NextRouter } from 'next/router';

export function isRouteActive(pathname: string, router: NextRouter) {
  return router.pathname === pathname;
}
