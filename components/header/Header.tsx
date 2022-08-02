import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
  left: ReactNode;
  right: ReactNode;
}

export default function Header({ left, right }: Props) {
  return (
    <nav>
      <Flex>
        {left}
        {right}
      </Flex>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
}

// TODO create models and old school RESTish routing, including for lists and [id]s
