import React from 'react';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/react';
import { isRouteActive } from '~/helpers';

export default function Link({ id, href, text, router }: any) {
  return (
    <Button colorScheme="teal" variant="link">
      <NextLink key={id} href={href}>
        <a className="bold" data-active={isRouteActive(href, router)}>
          {text}
        </a>
      </NextLink>
    </Button>
  );
}
