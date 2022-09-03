import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

/* NEXT perfect thing to try the infer props of component from instead of exporting */
export type ListItemCardSize = 'large' | 'container';
interface Props {
  children: ReactNode;
  size?: ListItemCardSize;
}

export const cardSizeStyles = {
  large: {
    width: '2xl',
    height: '3xl',
  },
  container: {},
};

export default function ListItemCard({ children, size = 'container' }: Props) {
  return (
    <Box
      bg="orange.200"
      border="4px"
      borderColor="orange.500"
      borderStyle="dashed"
      padding="8"
      sx={cardSizeStyles[size]}
    >
      {children}
    </Box>
  );
}
