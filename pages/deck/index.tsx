import React from 'react';
import { GetServerSideProps } from 'next';
import { Card as CardModel } from '@prisma/client';
import { Card, PageLayout } from '~/components';
import prisma from '~/clients/prisma';
import { trpc } from '~/utils';

interface ServerSideProps {
  deck: CardModel[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const deck = await prisma.card.findMany();

  return { props: { deck } };
};

function Deck(props: ServerSideProps) {
  const hello = trpc.useQuery(['hello', { text: 'Mr. Foo' }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="page">
        <h1>{hello.data.greeting}</h1>
        <main>
          {props.deck.map((card) => {
            return <Card key={card.id} title={card.title} description={card.description} />;
          })}
        </main>
      </div>
    </PageLayout>
  );
}

export default Deck;
