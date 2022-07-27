import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { withTRPC } from '@trpc/next';
import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter } from './api/trpc/[trpc]';

// TODO: add an alias to absolute imports to make clear it is from this/self

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
  config({ ctx }) {
    const url =
      process.env.NODE_ENV === 'production'
        ? `${process.env.VERCEL_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc';

    return {
      url,
      queryClientConfig: { defaultOptions: { queries: { staleTime: 120 } } },
    };
  },
  ssr: false,
})(App);
