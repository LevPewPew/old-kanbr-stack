import React, { ReactNode } from 'react';
import { Center } from '@chakra-ui/react';
import { cardSizeStyles } from '~/components/card';

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
    <Center position={'relative'} sx={{ ...cardSizeStyles, ...childrenStyle }}>
      {children}
    </Center>
  );
}