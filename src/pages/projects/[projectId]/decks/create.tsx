import React from 'react';
import { useRouter } from 'next/router';
import { AppLayout } from '~/components';
import { DeckForm } from '~/components';

export default function CreateDeckPage() {
  const router = useRouter();
  const { projectId } = router.query;
  /* FIXME make it throw and error if it could not find the projectId */
  let UNSAFE_projectId;
  if (typeof projectId === 'string') {
    UNSAFE_projectId = projectId;
  } else if (projectId) {
    UNSAFE_projectId = projectId[0];
  } else {
    UNSAFE_projectId = 'ERROR: Could not find projectId';
  }

  return (
    <AppLayout>
      <div className="page">
        <DeckForm projectId={UNSAFE_projectId} />
      </div>
    </AppLayout>
  );
}
