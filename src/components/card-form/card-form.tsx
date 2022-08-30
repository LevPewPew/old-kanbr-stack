import React, { useEffect } from 'react';
import Router from 'next/router';
import { FormErrorMessage, FormLabel, FormControl, Input } from '@chakra-ui/react';
import { z } from 'zod';
import { useMutation, useZodForm } from '~/hooks';
import { sanitizeReactHookFormValues } from '~/helpers';
import { Button } from '~/components';

export const cardFormSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
});

type CardFormSchema = z.infer<typeof cardFormSchema>;
interface Props {
  deckId: string;
  projectId: string;
}

/* TODO add editing prop and functionality. will need to have default values come
from data or props. dependency injecting onSubmit handler is probably best approach */
export default function CardForm({ deckId, projectId }: Props) {
  const createCard = useMutation(['cards.create']);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: cardFormSchema,
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: CardFormSchema) {
    // FIXME do i need a preventdefault? am i submitting to the server even when validation showing error implies that i didn't?
    const sanitizedValues = sanitizeReactHookFormValues(values);
    const inputArguments = { ...sanitizedValues, deckId };
    createCard.mutate(inputArguments);
  }

  useEffect(() => {
    if (createCard.isSuccess) {
      /* TODO push to card just created, not list of cards */
      Router.push(`/projects/${projectId}/decks/${deckId}`);
    }
  }, [createCard.isSuccess]);

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
