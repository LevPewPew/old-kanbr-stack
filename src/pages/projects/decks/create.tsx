import React from 'react';
import { useRouter } from 'next/router';
import { PageLayout } from '~/components';
import { DeckForm } from '~/components';

export default function CreateDeckPage() {
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
  console.log('🚀 ~ CreateDeckPage ~ router.query', router.query);

  return (
    <PageLayout>
      <div className="page">
        <DeckForm deckId={UNSAFE_deckId} />
      </div>
    </PageLayout>
  );
}
