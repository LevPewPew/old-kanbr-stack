import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export interface Props {
  title: string;
  description: string | nullish;
}

export default function Card({ title, description }: Props) {
  return (
    <Box bg="orange.200" border="4px" borderColor="orange.500" borderStyle="dashed" minH="48">
      <Heading as="h2">{title}</Heading>
      <Text>{description}</Text>
    </Box>
  );
}
