import React, { ComponentProps } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { capitalCase } from 'change-case';
import { CardStatus } from '@prisma/client';
import { CardItem } from '~/components';

interface Props {
  title: string;
  description?: string;
  users: { id: string; name: string }[];
  status: CardStatus;
  size?: ComponentProps<typeof CardItem>['size'];
}

export default function CardCardItem({ title, description, users, status, size }: Props) {
  return (
    <CardItem size={size}>
      <Heading as="h4">{title}</Heading>
      <Text mt="2">{description}</Text>
      <Text mt="2">On it:</Text>
      {users.map((user) => (
        <div key={user.id}>
          <Text mt="2">{user.id}</Text>
          <Text mt="2">{user.name}</Text>
        </div>
      ))}
      <Text mt="2">Status: {capitalCase(status)}</Text>
    </CardItem>
  );
}
