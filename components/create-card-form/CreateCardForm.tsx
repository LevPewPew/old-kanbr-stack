import React, { useEffect } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { pickBy } from 'lodash';
import { trpc } from 'utils/trpc';

const schema = z.object({
  /*  FIXME make this like the schema object in the trpc end. make a single source of truth
  to share between them. unfortunately this message stuff makes it not so simple.
  possibly create my own wrapper that checks if somehting is a ZodString, then
  auto add the .min(1, { message: 'Fooquired' }) */
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
});

type Schema = z.infer<typeof schema>;

export default function CreateCardForm() {
  const createCard = trpc.useMutation(['createCard']);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  function onSubmit(values: Schema) {
    const sanitizedValues = pickBy(values, (value) => {
      const isEmptyString = typeof value === 'string' && value.length === 0;

      return !isEmptyString;
      /*  FIXME probably better way to do this than assertion
      maybe write my own wrapper util method that takes a generic? */
    }) as Schema;
    createCard.mutate(sanitizedValues);
  }

  useEffect(() => {
    if (createCard.isSuccess) {
      Router.push('/deck');
    }
  }, [createCard.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.title || errors.description)}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" placeholder="title" {...register('title')} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        {errors.title?.message && <p>{errors.title?.message}</p>}
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" placeholder="description" {...register('description')} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
