import React, { ReactNode } from 'react';
import { Center } from '@chakra-ui/react';
import { cardSizeStyles } from '~/components/list-item-card';

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
    <Center position={'relative'} sx={{ ...cardSizeStyles.large, ...childrenStyle }}>
      {children}
    </Center>
  );
}
