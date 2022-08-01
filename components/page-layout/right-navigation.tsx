import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Container } from '@chakra-ui/react';
import { Header } from '~/components';
import { isActive } from './header.helpers';

interface LinkModel {
  id: string;
  text: string;
  href: string;
  isSessionOnly: boolean;
}

interface ServerSideProps {
  links: LinkModel[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* TODO get nav links from backend based on auth */
  const links = [
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

  return { props: { links } };
};

export default function RightNavigation({ links }: ServerSideProps) {
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
                <a className="bold" data-active={isActive(`${link.href}`, router)}>
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
