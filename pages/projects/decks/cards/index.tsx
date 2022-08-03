import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card as CardModel, User as UserModel } from '@prisma/client';
import produce from 'immer';
import { Button, HStack } from '@chakra-ui/react';
import { Card, Deck, PageLayout } from '~/components';
import prisma from '~/clients/prisma';
import { trpc } from '~/utils';

type CardQueryResponse = (CardModel & {
  users: Pick<UserModel, 'id' | 'name'>[];
})[];

interface ServerSideProps {
  cards: CardQueryResponse;
}
// NEXT see if i can do an infer from this, like the zod schema infers, instead of hand mimicing the types
export const getServerSideProps: GetServerSideProps = async () => {
  const cards = await prisma.card.findMany({
    include: {
      users: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return { props: { cards } };
};

export default function CardsPage(props: ServerSideProps) {
  const [deck, setDeck] = useState<CardQueryResponse>([]);

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
            /* NEXT change to an object with id and name. reflect this in Card props */
            const userIds = card.users.map((user) => user.id);
            return (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                status={card.status}
                assigned={userIds}
              />
            );
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
