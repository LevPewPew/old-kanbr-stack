import { z } from 'zod';
import { createRouter } from '~/server/create-router';

export const createProjectSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
  userId: z.string(),
});

export const projectsRouter = createRouter().mutation('create', {
  input: createProjectSchema,
  async resolve({ ctx, input }) {
    const project = await ctx.prisma.project.create({
      data: input,
    });

    return project;
  },
});

export type ProjectsRouter = typeof projectsRouter;
