import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Container } from '@chakra-ui/react';
import { Header } from '~/components';
import { isRouteActive } from '~/helpers';

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
            return (
              // TODO DRY the Link and anchor into an opinionated link, with variant prop
              <Link key={link.id} href={link.href}>
                <a className="bold" data-active={isRouteActive(link.href, router)}>
                  {link.text}
                </a>
              </Link>
            );
          }
        })}
        right={rightLinks.map((link) => {
          if (link.displayStatus === sessionStatus) {
            return (
              // TODO DRY the Link and anchor into an opinionated link, with variant prop
              <>
                <Link key={link.id} href={link.href}>
                  <a className="bold" data-active={isRouteActive(link.href, router)}>
                    {link.text}
                  </a>
                </Link>
              </>
            );
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
