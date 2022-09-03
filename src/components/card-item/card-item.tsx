import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type CardItemSize = 'large' | 'container';
interface Props {
  children: ReactNode;
  size?: CardItemSize;
}

export const cardSizeStyles = {
  large: {
    width: '2xl',
    height: '3xl',
  },
  container: {},
};

export default function CardItem({ children, size = 'container' }: Props) {
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
