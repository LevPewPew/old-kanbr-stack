import React, { useEffect } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { Card } from '@prisma/client';
import { z } from 'zod';
import { trpc } from 'utils/trpc';

const schema = z.object({ title: z.string(), description: z.string().nullish() });

export default function CreateCardForm() {
  const createCard = trpc.useMutation(['createCard']);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  function onSubmit(values: any) {
    createCard.mutate(values);
  }

  useEffect(() => {
    if (createCard.isSuccess) {
      Router.push('/deck');
    }
  }, [createCard.isSuccess]);

  /* TODO: change to zod schema validation. preferably by exporting a single source of truth around. 
i.e. trpc also uses a zod object, can probably share between the FC and the form */

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.title)}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input id="title" placeholder="title" {...register('title')} />
        <FormErrorMessage>{errors.title && 'required!'}</FormErrorMessage>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" placeholder="description" {...register('description')} />
        <FormErrorMessage>{errors.description && "i don't even know..."}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
