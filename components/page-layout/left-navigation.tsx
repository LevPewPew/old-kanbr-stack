import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { isRouteActive } from '~/helpers';

interface LinkModel {
  id: string;
  text: string;
  href: string;
  isSessionOnly: boolean;
}

/* TODO get nav links from backend based on auth. Pass as server side props via
specific page */
const links: LinkModel[] = [
  {
    id: '1',
    text: 'Home',
    href: '/',
    isSessionOnly: false,
  },
  {
    id: '1',
    text: 'Projects',
    href: '/',
    isSessionOnly: true,
  },
  {
    id: '1',
    text: 'Decks',
    href: '/',
    isSessionOnly: true,
  },
  {
    id: '1',
    text: 'Cards',
    href: '/',
    isSessionOnly: true,
  },
  {
    id: '1',
    text: 'New Card',
    href: '/',
    isSessionOnly: true,
  },
];

export default function LeftNavigation() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  return (
    <>
      {links.map((link) => {
        const isLinkShown =
          (link.isSessionOnly && sessionStatus === 'authenticated') || !link.isSessionOnly;

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
