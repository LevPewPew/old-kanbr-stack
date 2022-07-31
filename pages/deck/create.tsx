import React from 'react';
import { PageLayout } from '~/components';
import { CardForm } from '~/components';

export default function CreateCardPage() {
  return (
    <PageLayout>
      <div className="page">
        <CardForm />
      </div>
    </PageLayout>
  );
}
