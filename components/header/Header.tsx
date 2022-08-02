import React, { ReactNode } from 'react';
import { Flex, HStack } from '@chakra-ui/react';

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export default function Header({ left, right }: Props) {
  return (
    <Flex as="nav" flexDirection="row" justify="space-between" paddingX="8" paddingY="4">
      <HStack spacing="4">{left}</HStack>
      <HStack spacing="4">{right}</HStack>
    </Flex>
  );
}

// TODO create models and old school RESTish routing, including for lists and [id]s
