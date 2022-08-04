import { useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/* NOTE: don't understand how this works exactly, it was copied from:
https://kitchen-sink.trpc.io/react-hook-form

created because of this issue:
https://github.com/trpc/trpc/discussions/2021
*/
export default function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  },
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      rawValues: true,
    }),
  });

  return form;
}
