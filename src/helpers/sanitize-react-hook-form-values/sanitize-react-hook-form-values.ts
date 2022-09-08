import { shake } from 'radash';

export default function sanitizeReactHookFormValues<T extends Record<string, any>>(object: T) {
  /* react-hook-form converts empty fields to have empty strings, instead of
    leaving undefined. we want undefined to be passed to the database, so we
    convert the empty strings to undefined */
  const newObject = shake(object, (value) => {
    return value === '';
  }) as T;

  return newObject;
}
