import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

// TODO figure out a way to make prisma client the source of truth for this, preferably without having this component be aware snake case being used in the enum
type Status = 'READY' | 'IN_PROGRESS' | 'COMPLETE';

interface Props {
  title: string;
  description: string | nullish;
  assigned: string[];
  status: Status;
}

export const cardSizeStyles = {
  width: '2xl',
  height: '3xl',
};

export default function Card({ title, description, assigned, status }: Props) {
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
      <Text mt="2">On it:</Text>
      {/* FIXME don't use index for key */}
      {assigned.map((user, i) => (
        <Text key={i} mt="2">
          {user}
        </Text>
      ))}
      <Text mt="2">Status: {status}</Text>
    </Box>
  );
}
