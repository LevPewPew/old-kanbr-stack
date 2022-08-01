import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Container } from '@chakra-ui/react';
import { Header } from '~/components';
import LeftNavigation from './left-navigation';
import RightNavigation from './right-navigation';

type Props = {
  children: ReactNode;
};

/* FIXME make more composable by lifting left and right to props. This will
allow pages to control what is in navigation */
export default function PageLayout(props: Props) {
  return (
    <div>
      <Header left={<LeftNavigation />} right={<RightNavigation />} />
      <Container>{props.children}</Container>
    </div>
  );
}
