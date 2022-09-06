import React, { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

type Props = {
  heading: string;
  subHeading?: string;
  children: ReactNode;
  maxWidth?: string; // FIXME make this type a union of chakra Container maxWidth prop
};

/* FIXME make more composable by lifting left and right to props. This will
allow pages to control what is in navigation */
export default function PageLayout({
  heading,
  subHeading,
  children,
  maxWidth = 'container.lg',
}: Props) {
  return (
    <>
      {/* TODO make these use Chakra headings + theme */}
      <h1>{heading}</h1>
      {subHeading && <h2>{subHeading}</h2>}
      <Container as="main" maxWidth={maxWidth}>
        {children}
      </Container>
    </>
  );
}
