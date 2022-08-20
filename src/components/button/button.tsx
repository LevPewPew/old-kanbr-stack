import React, { ReactNode } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

// FIXME change any to interface for Button from Chakra
// FIXME make it so interface does not let you pass in the opinionated props to not waste devs time
export default function Button(props: any) {
  return <ChakraButton {...props} colorScheme="purple" />;
}
