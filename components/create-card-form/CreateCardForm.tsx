import React, { useEffect } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react';
import { Card } from '@prisma/client';
import { z } from 'zod';
import { trpc } from 'utils/trpc';

const schema = z.object({
  title: z.string(), // FIXME make this like the schema object in the trpc end?
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
    console.log(values);
    // const foo = {
    //   title: '',
    //   description: 'ha',
    // };
    //@ts-ignore
    createCard.mutate(values);
  }
  //@ts-ignore
  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    if (createCard.isSuccess) {
      Router.push('/deck');
    }
  }, [createCard.isSuccess]);

  /* TODO: change to zod schema validation. preferably by exporting a single source of truth around. 
i.e. trpc also uses a zod object, can probably share between the FC and the form */

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <FormControl isInvalid={Boolean(errors.title)}> */}
      <FormLabel htmlFor="title">Title</FormLabel>
      <Input id="title" placeholder="title" {...register('title')} />
      {/* <FormErrorMessage>{errors.title?.message}</FormErrorMessage> */}
      {errors.title?.message && <p>{errors.title?.message}</p>}
      <FormLabel htmlFor="description">Description</FormLabel>
      <Input id="description" placeholder="description" {...register('description')} />
      <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      {/* </FormControl> */}
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

/* FIXME: form sends empty string for empty values instead of null
https://github.com/react-hook-form/react-hook-form/issues/656
 */
