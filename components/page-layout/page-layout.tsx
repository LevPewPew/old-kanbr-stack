import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Container } from '@chakra-ui/react';
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
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  return (
    <div>
      <Header
        left={leftLinks.map((link) => {
          if (link.displayStatus === sessionStatus) {
            return <Link id={link.id} href={link.href} text={link.text} router={router} />;
          }
        })}
        right={rightLinks.map((link) => {
          if (link.displayStatus === sessionStatus) {
            return <Link id={link.id} href={link.href} text={link.text} router={router} />;
          }
          if (sessionStatus === 'authenticated') {
            return (
              <>
                <button onClick={() => signOut()}>
                  <a>Log out</a>
                </button>
                <Avatar />
              </>
            );
          }
          if (sessionStatus === 'loading') {
            return <div>Checking authorization...</div>;
          }
        })}
      />
      <Container>{props.children}</Container>
    </div>
  );
}
