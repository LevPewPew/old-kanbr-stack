import React from 'react';
import prisma from '~/clients/prisma';

// NEXT fix the any type
export async function getServerSideProps(ctx: any) {
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
