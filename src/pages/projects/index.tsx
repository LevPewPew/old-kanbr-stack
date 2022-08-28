import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import Router from 'next/router';
import prisma from '~/clients/prisma';
import { PageLayout } from '~/components';

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// NEXT find projects only for the signed in user
export async function getServerSideProps() {
  const projects = await prisma.project.findMany();

  return { props: { projects } };
}

export default function ProjectsPage({ projects }: ServerSideProps) {
  return (
    <PageLayout>
      <h1>PROJECT LIST PAGE</h1>
      {projects.map((project) => {
        return (
          <div key={project.id}>
            <li>title: {project.title}</li>
            <li>description: {project.description}</li>
            <button onClick={() => Router.push(`/projects/${project.id}`)}>link to project</button>
          </div>
        );
      })}
    </PageLayout>
  );
}
