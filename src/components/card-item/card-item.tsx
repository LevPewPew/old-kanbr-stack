import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type CardItemSize = 'large' | 'container';
interface Props {
  children: ReactNode;
  onClick?: () => void;
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

export default function CardItem({ children, onClick, size = 'container' }: Props) {
  function cursorKind() {
    return onClick ? 'pointer' : 'default';
  }

  return (
    <Box
      bg="purple.100"
      border="2px"
      borderColor="purple.200"
      borderStyle="solid"
      padding="8"
      rounded="md"
      sx={cardSizeStyles[size]}
      onClick={onClick}
      cursor={cursorKind()}
    >
      {children}
    </Box>
  );
}
