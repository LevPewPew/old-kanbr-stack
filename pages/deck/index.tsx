import React from 'react';
import { GetServerSideProps } from 'next';
import { Heading, Text } from '@chakra-ui/react';
import Layout from 'components/Layout';
import prisma from 'clients/prisma';
import { trpc } from 'utils/trpc';

export const getServerSideProps: GetServerSideProps = async () => {
  const deck = await prisma.card.findMany();

  return { props: { deck } };
};

interface CardProps {
  id: string;
  title: string;
  description: string;
}

interface Props {
  deck: CardProps[];
}

function Deck(props: Props) {
  const hello = trpc.useQuery(['hello', { text: 'Mr. Foo' }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="page">
        <h1>{hello.data.greeting}</h1>
        <main>
          {props.deck.map((card) => (
            <div key={card.id}>
              <Heading as="h2">{card.title}</Heading>
              <Text>{card.description}</Text>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
}

export default Deck;
