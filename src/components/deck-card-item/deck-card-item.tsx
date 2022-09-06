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
  function handleOnClick() {
    navigateToProject();
  }

  function navigateToProject() {
    Router.push(`/projects/${projectId}/decks/${deckId}`);
  }

  return (
    <CardItem size={size} onClick={handleOnClick}>
      <Heading as="h4">{title}</Heading>
      <Text mt="2">{description}</Text>
    </CardItem>
  );
}
