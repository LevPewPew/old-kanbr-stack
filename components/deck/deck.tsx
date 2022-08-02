import React, { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export default function Deck({ children }: Props) {
  return <div>{children}</div>;
}
