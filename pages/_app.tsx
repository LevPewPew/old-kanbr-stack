import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { withTRPC } from '@trpc/next';
import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter } from '~/pages/api/trpc/[trpc]';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    const url =
      process.env.NODE_ENV === 'production'
        ? `${process.env.VERCEL_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc';

    return {
      url,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 120 } } },
    };
  },
  /* SSR false due to this (currently) unresolved issue
  https://github.com/trpc/trpc/issues/596 
  
  Will still use getServerSideProps props where the pattern is "expected" as if
  it is working as intended. This is to minimize tech debt if issue is resolved
  in future we can just flip this flag. Also helps developers with mental models.
  */
  ssr: false,
})(App);
