import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Button, Container, Text } from '@chakra-ui/react';
import { Header, Link } from '~/components';

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
    text: 'Decks',
    href: '/projects/decks',
    displayStatus: 'authenticated',
  },
  {
    id: '4',
    text: 'Cards',
    href: '/projects/decks/cards',
    displayStatus: 'authenticated',
  },
  {
    id: '5',
    text: 'New Card',
    href: '/projects/decks/cards/create',
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

/* FIXME make more composable by lifting left and right to props. This will
allow pages to control what is in navigation */
export default function PageLayout(props: Props) {
  const { status: userStatus, data: session } = useSession();
  const router = useRouter();

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
                {/* TODO convert this and all Buttons to opinionated component so style can be controlled in one location */}
                <Button colorScheme="teal" variant="ghost" onClick={() => signOut()}>
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
      <Container as="main" maxWidth={'container.lg'}>
        {props.children}
      </Container>
    </div>
  );
}
