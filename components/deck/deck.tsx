import React from 'react';

export interface Props {
  // children: React.ReactNode;
  children: any;
}

export default function Deck({ children }: Props) {
  return <div>{children}</div>;
}
