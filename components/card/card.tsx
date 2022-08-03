import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

// NEXT figure out a way to make prisma client the source of truth for this, preferably without having this component be aware snake case being used in the enum
type Status = 'READY' | 'IN_PROGRESS' | 'COMPLETE';

interface Props {
  title: string;
  description: string | nullish;
  users: { id: string; name: string }[];
  status: Status;
}

export const cardSizeStyles = {
  width: '2xl',
  height: '3xl',
};

export default function Card({ title, description, users, status }: Props) {
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
      {users.map((user, i) => (
        <div key={i}>
          <Text mt="2">{user.id}</Text>
          <Text mt="2">{user.name}</Text>
        </div>
      ))}
      <Text mt="2">Status: {status}</Text>
    </Box>
  );
}
