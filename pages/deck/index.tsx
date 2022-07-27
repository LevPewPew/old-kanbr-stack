import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from 'components/Layout';
import prisma from 'clients/prisma';
import { trpc } from 'utils/trpc';

export const getServerSideProps: GetServerSideProps = async () => {
  const deck = await prisma.ticket.findMany();

  return { props: { deck } };
};

interface TicketProps {
  id: string;
  title: string;
  description: string;
}

interface Props {
  deck: TicketProps[];
}

const Deck: React.FC<Props> = (props) => {
  const hello = trpc.useQuery(['hello', { text: 'Mr. Foo' }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="page">
        <h1>{hello.data.greeting}</h1>
        <main>
          {props.deck.map((ticket) => (
            <div key={ticket.id} className="post">
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Deck;
