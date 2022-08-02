import React, { ReactNode } from 'react';
import { Center } from '@chakra-ui/react';

export interface Props {
  children: ReactNode;
}

const childrenStyle = {
  '& > *': {
    position: 'absolute',
  },
};

export default function Deck({ children }: Props) {
  return (
    <Center
      bg="blue.200"
      border="4px"
      borderColor="blue.500"
      borderStyle="dashed"
      className="foo"
      position={'relative'}
      width="xl"
      height="xl"
      sx={childrenStyle}
    >
      {children}
    </Center>
  );
}
