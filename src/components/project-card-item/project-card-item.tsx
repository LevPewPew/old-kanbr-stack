import React, { ComponentProps } from 'react';
import Router from 'next/router';
import { Heading, Text } from '@chakra-ui/react';
import { Button, CardItem } from '~/components';

interface Props {
  title: string;
  description: string | nullish;
  projectId: string;
  size?: ComponentProps<typeof CardItem>['size'];
}

export default function ProjectCardItem({ title, description, projectId, size }: Props) {
  return (
    <CardItem size={size}>
      <Heading as="h4">{title}</Heading>
      <Text mt="2">{description}</Text>
      <Button onClick={() => Router.push(`/projects/${projectId}`)}>View Project</Button>
    </CardItem>
  );
}
