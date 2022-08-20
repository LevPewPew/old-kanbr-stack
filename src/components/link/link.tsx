import React from 'react';
import NextLink from 'next/link';
import { Box } from '@chakra-ui/react';
import { Button } from '~/components';
import { isRouteActive } from '~/helpers';

/* FIXME the underline and active behaviour looks a bit funny due to double 
underline when hovering over active link. best solution probably to have borderColor
disappear on hover */
export default function Link({ id, href, text, router }: any) {
  return (
    <Box
      borderBottom="1px"
      borderColor={isRouteActive(href, router) ? 'purple.500' : 'transparent'}
      borderStyle="solid"
    >
      <Button variant="link">
        <NextLink key={id} href={href}>
          <a>{text}</a>
        </NextLink>
      </Button>
    </Box>
  );
}
