import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Container, Text } from '@chakra-ui/react';
import { Button, Header, Link } from '~/components';

type Props = {
  children: ReactNode;
  maxWidth?: string; // FIXME make this type a union of chakra Container maxWidth prop
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
export default function PageLayout({ children, maxWidth = 'container.lg' }: Props) {
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
    <div>
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
      <Container as="main" maxWidth={maxWidth}>
        {children}
      </Container>
    </div>
  );
}
