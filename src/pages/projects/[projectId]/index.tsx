import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Router from 'next/router';
import prisma from '~/clients/prisma';
import { Button } from '~/components';

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

/* FIXME fix the any type. need to create a type that contains the possible 
dynamic route variable names, or just the one to expect on ProjectPage. this 
will easily get out of sync though, is it worth it? is there a more kept in sync
way it can be done that just needs to be researched? */
export async function getServerSideProps(ctx: GetServerSidePropsContext<any>) {
  const { projectId } = ctx.params;
  const decks = await prisma.deck.findMany({
    where: {
      projectId,
    },
  });

  return { props: { decks, projectId } };
}

export default function ProjectPage({ decks, projectId }: ServerSideProps) {
  return (
    <div>
      <h1>PROJECT PAGE PLACEHOLDER</h1>
      <h2>LIST OF DECKS</h2>
      {decks.map((deck) => {
        return (
          <div key={deck.id}>
            <li>title: {deck.title}</li>
            <li>description: {deck.description}</li>
            <Button onClick={() => Router.push(`/projects/${projectId}/decks/${deck.id}`)}>
              link to deck
            </Button>
          </div>
        );
      })}
      <Button onClick={() => Router.push(`/projects/${projectId}/decks/create`)}>NEW deck</Button>
    </div>
  );
}
