import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { capitalCase } from 'change-case';
import { Card as CardModel } from '@prisma/client';
import { ListItemCard } from '~/components';
import { ListItemCardSize } from '~/components/list-item-card/list-item-card'; /* NEXT get rid of this once i try the infer from props trick */

interface Props {
  title: string;
  description: string | nullish;
  users: { id: string; name: string }[];
  status: CardModel['status'];
  size?: ListItemCardSize;
}

export default function Card({ title, description, users, status, size }: Props) {
  return (
    <ListItemCard size={size}>
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
    </ListItemCard>
  );
}
