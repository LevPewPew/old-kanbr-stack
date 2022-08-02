import React, { ReactNode } from 'react';
import { Box, Center } from '@chakra-ui/react';

export interface Props {
  children: ReactNode;
}

export default function Deck({ children }: Props) {
  return (
    <Center bg="red.200">
      <Box border="4px" borderColor="blue.400" borderStyle="dashed">
        {children}
      </Box>
    </Center>
  );
}
