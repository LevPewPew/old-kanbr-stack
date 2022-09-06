import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import Router from 'next/router';
import prisma from '~/clients/prisma';
import { Button, CardItemList, PageLayout, ProjectCardItem } from '~/components';

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// FIXME any type
export async function getServerSideProps(ctx: GetServerSidePropsContext<any>) {
  const session = await getSession(ctx);
  const userId = session?.user?.id;
  const projectToUsers = await prisma.projectToUser.findMany({
    where: {
      userId,
    },
    include: {
      Project: true,
    },
  });
  /* FIXME change prisma query so that the response comes out in this shape
  directly, this removes the need to map into expected and convenient shape */
  const projects = projectToUsers.map((projectToUser) => ({ ...projectToUser.Project }));

  return { props: { projects } };
}

export default function ProjectsPage({ projects }: ServerSideProps) {
  return (
    <PageLayout heading="Projects">
      <CardItemList>
        {projects.map((project) => {
          return (
            <ProjectCardItem
              key={project.id}
              title={project.title}
              description={project.description}
              projectId={project.id}
            />
          );
        })}
      </CardItemList>
      <Button onClick={() => Router.push(`/projects/create`)}>NEW project</Button>
    </PageLayout>
  );
}
