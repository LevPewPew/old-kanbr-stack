// @ts-nocheck
// TODO: remove the nocheck once real feature not placeholder

import React, { useEffect } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { trpc } from 'utils/trpc';

export default function CreateTicketForm() {
  const createTicket = trpc.useMutation(['createTicket', { text: 'Mr. Foo' }]);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    createTicket.mutate(values);
  }

  useEffect(() => {
    if (createTicket.isSuccess) {
      Router.push('/deck');
    }
  }, [createTicket.isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="title"
          {...register('title', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          id="description"
          placeholder="description"
          // FIXME: change to not required
          {...register('description')}
        />
        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
