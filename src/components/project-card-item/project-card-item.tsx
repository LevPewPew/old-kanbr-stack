import React, { ComponentProps } from 'react';
import Router from 'next/router';
import { Heading, Text } from '@chakra-ui/react';
import { CardItem } from '~/components';

interface Props {
  title: string;
  description: string | nullish;
  projectId: string;
  size?: ComponentProps<typeof CardItem>['size'];
}

export default function ProjectCardItem({ title, description, projectId, size }: Props) {
  function handleOnClick() {
    navigateToProject();
  }

  function navigateToProject() {
    Router.push(`/projects/${projectId}`);
  }

  return (
    <CardItem size={size} onClick={handleOnClick}>
      <Heading as="h4">{title}</Heading>
      <Text mt="2">{description}</Text>
    </CardItem>
  );
}
