import React, { ReactNode } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

export default function CardItemList({ children }: Props) {
  return (
    <SimpleGrid columns={4} spacing={5}>
      {children}
    </SimpleGrid>
  );
}
