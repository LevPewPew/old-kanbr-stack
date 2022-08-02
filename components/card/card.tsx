import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface Props {
  title: string;
  description: string | nullish;
}

export const cardSizeStyles = {
  width: '2xl',
  height: '3xl',
};

export default function Card({ title, description }: Props) {
  return (
    <Box
      bg="orange.200"
      border="4px"
      borderColor="orange.500"
      borderStyle="dashed"
      padding="8"
      sx={cardSizeStyles}
    >
      <Heading as="h2">{title}</Heading>
      <Text mt="2">{description}</Text>
    </Box>
  );
}
