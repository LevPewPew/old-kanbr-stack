import React, { useEffect } from 'react';
import Router from 'next/router';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/react';
import { z } from 'zod';
import { useMutation, useZodForm } from '~/hooks';
import { sanitizeReactHookFormValues } from '~/helpers';
import { Button } from '~/components';

const createDeckSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
});

type DeckFormSchema = z.infer<typeof createDeckSchema>;
interface Props {
  projectId: string;
}

export default function DeckForm({ projectId }: Props) {
  const createDeck = useMutation(['decks.create']);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: createDeckSchema,
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: DeckFormSchema) {
    const sanitizedValues = sanitizeReactHookFormValues(values);
    const inputArguments = { ...sanitizedValues, projectId };
    createDeck.mutate(inputArguments);
  }

  useEffect(() => {
    if (createDeck.isSuccess) {
      // TODO make it go to the deck that was just created, not the list of decks
      Router.push(`/projects/${projectId}`);
    }
  }, [createDeck.isSuccess]);

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
