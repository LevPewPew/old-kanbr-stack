import React, { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
import { Header } from '~/components';

type Props = {
  children: ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div>
      <Header />
      <Container>{props.children}</Container>
    </div>
  );
}
