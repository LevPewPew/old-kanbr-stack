import React from 'react';
import { Button, Box, Heading, Text } from '@chakra-ui/react';
import { capitalCase } from 'change-case';
import { Card as CardModel } from '@prisma/client';

interface Props {
  title: string;
  description: string | nullish;
  users: { id: string; name: string }[];
  status: CardModel['status'];
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
      <Text mt="2">Status: {capitalCase(status)}</Text>
      {/* TODO actually add user to card */}
      <Button onClick={() => alert("ADD USER TO CARD PLACEHOLDER")}>I&apos;m on it!</Button>
    </Box>
  );
}
