import React, { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import produce from 'immer';
import prisma from '~/clients/prisma';
import { Button, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Card, Deck, PageLayout } from '~/components';
import { useMutation } from '~/hooks';

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type DeckState = ServerSideProps['cards'];

export async function getServerSideProps() {
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
}

export default function CardsPage(props: ServerSideProps) {
  const [deck, setDeck] = useState<DeckState>([]);
  const assignUserToCard = useMutation(['users.assignToCard']);
  const { data: session } = useSession();
  const topCard = deck[deck.length - 1];
  /* TODO make so any page hidden behind auth doesn't need to check for userId existing */
  const userId = session?.user?.id;

  useEffect(() => {
    setDeck(props.cards);
  }, [props.cards]);

  function handleLeftClick() {
    removeCard();
  }

  function handleRightClick() {
    removeCard();
    if (userId) {
      assignUserToCard.mutate({ cardId: topCard.id, userId: userId });
    }
  }

  function removeCard() {
    setDeck(
      produce((draft) => {
        draft.pop();
      }),
    );
  }

  return (
    <PageLayout>
      <HStack spacing="4">
        <Button onClick={handleLeftClick} colorScheme={'red'}>
          {'<- LEFT'}
        </Button>
        <Deck>
          {deck.map((card) => {
            return (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                status={card.status}
                users={card.users}
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
