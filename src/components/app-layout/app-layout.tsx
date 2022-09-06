import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Box, Container, Flex, Text } from '@chakra-ui/react';
import { Button, Header, Link } from '~/components';

type Props = {
  children: ReactNode;
};

type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

interface LinkModel {
  id: string;
  text: string;
  href: string;
  displayStatus?: SessionStatus;
}

/* FIXME make more composable by lifting left and right to props. This will
allow pages to control what is in navigation */
export default function AppLayout({ children }: Props) {
  const { status: userStatus, data: session } = useSession();
  const router = useRouter();

  /* TODO links data should come from backend, based on auth */
  const leftLinks: LinkModel[] = [
    {
      id: '1',
      text: 'Home',
      href: '/',
    },
    {
      id: '2',
      text: 'Projects',
      href: '/projects',
      displayStatus: 'authenticated',
    },
    {
      id: '3',
      text: 'Big Picture',
      href: '/big-picture',
      displayStatus: 'authenticated',
    },
  ];

  const rightLinks: LinkModel[] = [
    {
      id: '1',
      text: 'Log in',
      href: '/api/auth/signin',
      displayStatus: 'unauthenticated',
    },
  ];

  return (
    <Container maxWidth="container.xl" height="100vh">
      <Flex direction="column" height="100%">
        <Header
          left={leftLinks.map((link) => {
            if (link.displayStatus === userStatus) {
              return <Link id={link.id} href={link.href} text={link.text} router={router} />;
            }
          })}
          right={rightLinks.map((link) => {
            if (link.displayStatus === userStatus) {
              return <Link id={link.id} href={link.href} text={link.text} router={router} />;
            }
            if (userStatus === 'authenticated') {
              return (
                <>
                  <Text>{session.user?.name}</Text>
                  <Avatar size="sm" />
                  <Button variant="ghost" onClick={() => signOut()}>
                    Log out
                  </Button>
                </>
              );
            }
            if (userStatus === 'loading') {
              return <div>Checking authorization...</div>;
            }
          })}
        />
        {children}
        <Box marginTop="auto">
          <Text>FOOTER PLACEHOLDER</Text>
        </Box>
      </Flex>
    </Container>
  );
}
