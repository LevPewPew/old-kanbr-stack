import React from 'react';
import { useRouter } from 'next/router';
import { PageLayout } from '~/components';
import { CardForm } from '~/components';

export default function CreateCardPage() {
  const router = useRouter();
  const { deckId, projectId } = router.query;
  /* FIXME make it throw and error if it could not find the deckId or projectId */
  let UNSAFE_deckId;
  if (typeof deckId === 'string') {
    UNSAFE_deckId = deckId;
  } else if (deckId) {
    UNSAFE_deckId = deckId[0];
  } else {
    UNSAFE_deckId = 'ERROR: Could not find deckId';
  }
  let UNSAFE_projectId;
  if (typeof projectId === 'string') {
    UNSAFE_projectId = projectId;
  } else if (projectId) {
    UNSAFE_projectId = projectId[0];
  } else {
    UNSAFE_projectId = 'ERROR: Could not find projectId';
  }

  return (
    <PageLayout>
      <div className="page">
        <CardForm deckId={UNSAFE_deckId} projectId={UNSAFE_projectId} />
      </div>
    </PageLayout>
  );
}
