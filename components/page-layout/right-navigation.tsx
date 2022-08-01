import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { isRouteActive } from '~/helpers';
/* NEXT DRY this. comment that it is just the status union for useSession from next-auth */
type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

interface LinkModel {
  id: string;
  text: string;
  href: string;
  displayStatus?: SessionStatus;
}

/* TODO get nav links from backend based on auth. Pass as server side props via
specific page */
const links: LinkModel[] = [
  {
    id: '1',
    text: 'Home',
    href: '/',
  },
  {
    id: '1',
    text: 'Projects',
    href: '/',
    displayStatus: 'authenticated',
  },
  {
    id: '1',
    text: 'Decks',
    href: '/',
    displayStatus: 'authenticated',
  },
  {
    id: '1',
    text: 'Cards',
    href: '/',
    displayStatus: 'authenticated',
  },
  {
    id: '1',
    text: 'New Card',
    href: '/',
    displayStatus: 'authenticated',
  },
];

export default function RightNavigation() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  return (
    <>
      {links.map((link) => {
        const isLinkShown =
          (link.displayStatus && sessionStatus === 'authenticated') || !link.displayStatus;

        return (
          <>
            {isLinkShown && (
              <Link key={link.id} href={link.href}>
                <a className="bold" data-active={isRouteActive(link.href, router)}>
                  {link.text}
                </a>
              </Link>
            )}
          </>
        );
      })}
    </>
  );
}
