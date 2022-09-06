import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type CardItemSize = 'large' | 'container';
interface Props {
  children: ReactNode;
  size?: CardItemSize;
}

/* TODO make this non-inferred type. make it so if expanded, it can only be
given values that fall into types accepted by a Chakra `sx` prop */
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
