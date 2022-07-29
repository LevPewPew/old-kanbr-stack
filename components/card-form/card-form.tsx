import React, { useEffect } from 'react';
import Router from 'next/router';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { trpc } from 'utils';
import { useZodForm } from 'hooks';
import { sanitizeReactHookFormValues } from 'helpers';

export const cardFormSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
});

type CardFormSchema = z.infer<typeof cardFormSchema>;

// TODO add editing and defaultValues prop with defaults (default defaults!!! lol)
export default function CardForm() {
  const createCard = trpc.useMutation(['createCard']);
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
      Router.push('/deck');
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
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
