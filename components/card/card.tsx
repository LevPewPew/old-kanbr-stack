import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { nullish } from '~/types/general';

export interface Props {
  title: string;
  description: string | nullish;
}

export default function Card({ title, description }: Props) {
  return (
    <div>
      <Heading as="h2">{title}</Heading>
      <Text>{description}</Text>
    </div>
  );
}
