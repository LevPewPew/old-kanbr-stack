import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import prisma from '~/clients/prisma';
import { CardCardItem, CardItemList, PageLayout } from '~/components';

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

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

/* This is the graph view page. The component should always be graph view page,
if it doesn't make sense to call it that, you built the wrong feature. The 
marketing/UX name for the route and heading can change as needed. */
export default function GraphViewPage(props: ServerSideProps) {
  return (
    <PageLayout heading="Big Picture" maxWidth="fit-content">
      <CardItemList>
        {props.cards.map((card) => {
          return (
            <CardCardItem
              key={card.id}
              title={card.title}
              description={card.description}
              status={card.status}
              users={card.users}
            />
          );
        })}
      </CardItemList>
    </PageLayout>
  );
}
