import React from 'react';
import { GetServerSideProps } from 'next';
import { Card as CardModel } from '@prisma/client';
import { Button, HStack } from '@chakra-ui/react';
import { Card, Deck, PageLayout } from '~/components';
import prisma from '~/clients/prisma';
import { trpc } from '~/utils';

interface ServerSideProps {
  deck: CardModel[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const deck = await prisma.card.findMany();

  return { props: { deck } };
};

export default function DeckPage(props: ServerSideProps) {
  const hello = trpc.useQuery(['hello', { text: 'Mr. Foo' }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <h1>{hello.data.greeting}</h1>
      <HStack spacing="4">
        <Button colorScheme={'red'}>{'<- LEFT'}</Button>
        <Deck>
          {props.deck.map((card) => {
            return <Card key={card.id} title={card.title} description={card.description} />;
          })}
        </Deck>
        <Button colorScheme={'green'}>{'RIGHT ->'}</Button>
      </HStack>
    </PageLayout>
  );
}
