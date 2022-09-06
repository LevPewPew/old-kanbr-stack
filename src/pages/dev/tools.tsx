import React, { useEffect, useState } from 'react';
import { Button, PageLayout } from '~/components';
import { useQuery } from '~/hooks';

/* FIXME make this page only visible by dev accounts */
export default function DevPage() {
  const [clientError, setClientError] = useState<boolean>(false);

  const internalServerError500Query = useQuery(['dev.internalServerError500'], {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  function getError500() {
    internalServerError500Query.refetch();
  }

  useEffect(() => {
    if (clientError) {
      throw Error('client error !!!');
    }
  }, [clientError]);

  return (
    <PageLayout heading="DEV TOOLS. INTERNAL USE ONLY">
      <div className="page">
        <h1>Dev testing and troubleshooting tools</h1>
        <Button onClick={getError500}>Get 500 Error</Button>
        <Button onClick={() => setClientError(true)}>Create Client Error</Button>
      </div>
    </PageLayout>
  );
}
