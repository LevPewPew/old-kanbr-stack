import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card as CardModel } from '@prisma/client';
import produce from 'immer';
import { Button, HStack } from '@chakra-ui/react';
import { Card, Deck, PageLayout } from '~/components';
import prisma from '~/clients/prisma';
import { trpc } from '~/utils';

interface ServerSideProps {
  cards: CardModel[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const cards = await prisma.card.findMany();
  // LEFTOFF somehow get the users info, i think prisma provides an easier way through the client, so i don't have to do some joined query or whatever
  const foo = cards.users;

  return { props: { cards } };
};

export default function CardsPage(props: ServerSideProps) {
  const [deck, setDeck] = useState<CardModel[]>([]);

  const hello = trpc.useQuery(['hello', { text: 'Mr. Foo' }]);

  function removeCard() {
    setDeck(
      produce((draft) => {
        draft.pop();
      }),
    );
  }

  function handleLeftClick() {
    removeCard();
  }

  function handleRightClick() {
    removeCard();
  }

  useEffect(() => {
    setDeck(props.cards);
  }, [props.cards]);

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <h1>{hello.data.greeting}</h1>
      <HStack spacing="4">
        <Button onClick={handleLeftClick} colorScheme={'red'}>
          {'<- LEFT'}
        </Button>
        <Deck>
          {deck.map((card) => {
            return <Card key={card.id} title={card.title} description={card.description} />;
          })}
        </Deck>
        <Button onClick={handleRightClick} colorScheme={'green'}>
          {'RIGHT ->'}
        </Button>
      </HStack>
    </PageLayout>
  );
}

/* TODO record a shuffled deck into the user (or account???) model have swipe 
left and write update this record into a small deck. user completing a card 
means deck reshuffles, ready for a new pick */
