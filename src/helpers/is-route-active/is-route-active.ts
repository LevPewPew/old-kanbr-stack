export default function isRouteActive(pathname: string, router: any) {
  return router.pathname === pathname;
}
