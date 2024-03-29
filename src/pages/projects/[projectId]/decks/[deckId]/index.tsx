import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Router from 'next/router';
import produce from 'immer';
import prisma from '~/clients/prisma';
import { Button as ChakraButton, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Button, CardCardItem, DeckVisual, PageLayout } from '~/components';
import { useMutation } from '~/hooks';

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type DeckState = ServerSideProps['cards'];

/* FIXME fix the any type. need to create a type that contains the possible 
dynamic route variable names, or just the one to expect on ProjectPage. this 
will easily get out of sync though, is it worth it? is there a more kept in sync
way it can be done that just needs to be researched? */
export async function getServerSideProps(ctx: GetServerSidePropsContext<any>) {
  const { deckId, projectId } = ctx.params;
  const cards = await prisma.card.findMany({
    where: {
      deckId,
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return { props: { cards, deckId, projectId } };
}

export default function DeckPage({ cards, deckId, projectId }: ServerSideProps) {
  const [deck, setDeck] = useState<DeckState>([]);
  const assignUserToCard = useMutation(['users.assignToCard']);
  const { data: session } = useSession();
  const topCard = deck[deck.length - 1];
  /* TODO make so any page hidden behind auth doesn't need to check for userId existing */
  const userId = session?.user?.id;

  useEffect(() => {
    setDeck(cards);
  }, [cards]);

  function handleLeftClick() {
    removeCard();
  }

  // LEFTOFF do the stuff to actually model tinder flow. use DecidedCard, get interests and match (for now just random match, later based on "compatability")

  function handleRightClick() {
    removeCard();
    // TODO use the DecidedCard model to keep track of what cards a user is interested in, and with what they are matched with
  }

  function handleNewCardClick() {
    Router.push(`/projects/${projectId}/decks/${deckId}/cards/create`);
  }

  function removeCard() {
    setDeck(
      produce((draft) => {
        draft.pop();
      }),
    );
    /* TODO create a list of undecided cards in DB per user, and remove cards from there when clicking through */
  }

  return (
    <PageLayout heading="Your Deck">
      <HStack spacing="4">
        <ChakraButton onClick={handleLeftClick} colorScheme={'red'}>
          {'<- LEFT'}
        </ChakraButton>
        <DeckVisual>
          {deck.map((card) => {
            return (
              <CardCardItem
                key={card.id}
                title={card.title}
                description={card.description ?? undefined}
                status={card.status}
                users={card.users}
                size="large"
              />
            );
          })}
        </DeckVisual>
        <ChakraButton onClick={handleRightClick} colorScheme={'green'}>
          {'RIGHT ->'}
        </ChakraButton>
      </HStack>
      <Button onClick={handleNewCardClick}>New Card</Button>
    </PageLayout>
  );
}

/* TODO record a shuffled deck into the user (or account???) model have swipe 
left and write update this record into a small deck. user completing a card 
means deck reshuffles, ready for a new pick */
