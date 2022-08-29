import { z } from 'zod';
import { createRouter } from '~/server/create-router';

export const projectsRouter = createRouter().mutation('create', {
  input: z.object({
    title: z.string(),
    description: z.string().nullish(),
    projectId: z.string(),
    userId: z.string(),
  }),
  async resolve({ ctx, input }) {
    const project = await ctx.prisma.project.create({
      data: {
        title: input.title,
        description: input.description,
      },
    });
    const projectToUser = await ctx.prisma.projectToUser.create({
      data: {
        userId: input.userId,
        projectId: project.id,
      },
    });

    return {
      project,
      projectToUser,
    };
  },
});

export type ProjectsRouter = typeof projectsRouter;
