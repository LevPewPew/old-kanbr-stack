import React from 'react';
import { PageLayout } from '~/components';
import { CardForm } from '~/components';

export default function CreateCard() {
  return (
    <PageLayout>
      <div className="page">
        <CardForm />
      </div>
    </PageLayout>
  );
}
