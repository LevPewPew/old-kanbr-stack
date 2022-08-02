import React from 'react';
import NextLink from 'next/link';
import { Box, Button } from '@chakra-ui/react';
import { isRouteActive } from '~/helpers';

export default function Link({ id, href, text, router }: any) {
  return (
    <Box
      borderBottom="1px"
      borderColor={isRouteActive(href, router) ? 'teal' : 'transparent'}
      borderStyle="solid"
    >
      <Button colorScheme="teal" variant="link">
        <NextLink key={id} href={href}>
          <a>{text}</a>
        </NextLink>
      </Button>
    </Box>
  );
}
