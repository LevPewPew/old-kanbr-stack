import React, { ComponentProps } from 'react';
import Router from 'next/router';
import { Heading, Text } from '@chakra-ui/react';
import { Button, CardItem } from '~/components';

interface Props {
  title: string;
  description: string | nullish;
  size?: ComponentProps<typeof CardItem>['size'];
  projectId: string;
  deckId: string;
}

export default function DeckCardItem({ title, description, size, projectId, deckId }: Props) {
  return (
    <CardItem size={size}>
      <Heading as="h4">{title}</Heading>
      <Text mt="2">{description}</Text>
      <Button onClick={() => Router.push(`/projects/${projectId}/decks/${deckId}`)}>
        View Deck
      </Button>
    </CardItem>
  );
}
