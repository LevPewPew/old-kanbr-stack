import React from 'react';
import { useRouter } from 'next/router';
import { PageLayout } from '~/components';
import { CardForm } from '~/components';

export default function CreateCardPage() {
  const router = useRouter();
  const { deckId } = router.query;
  /* FIXME make it throw and error if it could not find the deckId */
  let UNSAFE_deckId;
  if (typeof deckId === 'string') {
    UNSAFE_deckId = deckId;
  } else if (deckId) {
    UNSAFE_deckId = deckId[0];
  } else {
    UNSAFE_deckId = 'ERROR: Could not find deckId';
  }

  return (
    <PageLayout>
      <div className="page">
        <CardForm deckId={UNSAFE_deckId} />
      </div>
    </PageLayout>
  );
}
