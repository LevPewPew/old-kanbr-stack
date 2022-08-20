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

// TODO add editing and defaultValues prop with defaults (default defaults!!! lol)
export default function CardForm() {
  const createCard = useMutation(['card.create']);
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
    const sanitizedValues = sanitizeReactHookFormValues(values);
    createCard.mutate(sanitizedValues);
  }

  useEffect(() => {
    if (createCard.isSuccess) {
      Router.push('/projects/decks/cards');
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
