import React from 'react';
import { GetServerSidePropsContext } from 'next';
import prisma from '~/clients/prisma';

/* FIXME fix the any type. need to create a type that contains the possible 
dynamic route variable names, or just the one to expect on ProjectPage. this 
will easily get out of sync though, is it worth it? is there a more kept in sync
way it can be done that just needs to be researched? */
export async function getServerSideProps(ctx: GetServerSidePropsContext<any>) {
  const { projectId } = ctx.params;
  const decks = await prisma.deck.findMany({
    where: {
      id: projectId,
    },
  });

  return { props: { decks } };
}

export default function ProjectPage() {
  return (
    <div>
      <h1>PROJECT PAGE PLACEHOLDER</h1>
    </div>
  );
}
