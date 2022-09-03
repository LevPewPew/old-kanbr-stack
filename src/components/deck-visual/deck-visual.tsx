import React, { ReactNode } from 'react';
import { Center } from '@chakra-ui/react';
import { cardSizeStyles } from '~/components/card-item';

export interface Props {
  children: ReactNode;
}

const childrenStyle = {
  '& > *': {
    position: 'absolute',
  },
};

export default function DeckVisual({ children }: Props) {
  return (
    <Center position={'relative'} sx={{ ...cardSizeStyles.large, ...childrenStyle }}>
      {children}
    </Center>
  );
}
