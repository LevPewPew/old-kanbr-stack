import React from 'react';
import { PageLayout } from 'components';
import { CreateCardForm } from 'components';

interface Props {}

export default function CreateCard(props: Props) {
  return (
    <PageLayout>
      <div className="page">
        <CreateCardForm />
      </div>
    </PageLayout>
  );
}
