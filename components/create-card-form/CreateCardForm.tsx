import React, { useEffect } from 'react';
import Router from 'next/router';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { z } from 'zod';
import { pickBy } from 'lodash';
import { trpc } from 'utils/trpc';
import { useZodForm } from 'hooks';

export const createCardFormSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
  description: z.string().nullish(),
});

type Schema = z.infer<typeof createCardFormSchema>;

export default function CreateCardForm() {
  const createCard = trpc.useMutation(['createCard']);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: createCardFormSchema,
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: Schema) {
    console.log({ values });
    const sanitizedValues = pickBy(values, (value) => {
      const isEmptyString = typeof value === 'string' && value.length === 0;

      return !isEmptyString;
      /*  FIXME probably better way to do this than assertion
      maybe write my own wrapper util method that takes a generic?
      + remove the console logs */
    }) as Schema;
    console.log({ sanitizedValues });
    createCard.mutate(sanitizedValues);
  }

  useEffect(() => {
    if (createCard.isSuccess) {
      Router.push('/deck');
    }
  }, [createCard.isSuccess]);

  // FIXME all fields turn red when error in only one field
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
