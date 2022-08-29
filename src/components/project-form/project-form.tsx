import React, { useEffect } from 'react';
import Router from 'next/router';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/react';
import { z } from 'zod';
import { useMutation, useZodForm } from '~/hooks';
import { sanitizeReactHookFormValues } from '~/helpers';
import { Button } from '~/components';

const createProjectSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
});

type ProjectFormSchema = z.infer<typeof createProjectSchema>;
interface Props {
  userId: string;
}

export default function ProjectForm({ userId }: Props) {
  const createProject = useMutation(['projects.create']);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: createProjectSchema,
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: ProjectFormSchema) {
    const sanitizedValues = sanitizeReactHookFormValues(values);
    const inputArguments = { ...sanitizedValues, userId };
    createProject.mutate(inputArguments);
  }

  useEffect(() => {
    if (createProject.isSuccess) {
      // TODO make it go to the project that was just created, not the list of projects
      Router.push('/projects');
    }
  }, [createProject.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.title)}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" placeholder="title" {...register('title')} />
        {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.description)}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" placeholder="description" {...register('description')} />
        {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
      </FormControl>
      <Button mt={4} isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
