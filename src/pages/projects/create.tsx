import React from 'react';
import { useSession } from 'next-auth/react';
import { AppLayout, ProjectForm } from '~/components';

export default function CreateProjectPage() {
  const { data: session } = useSession();
  /* TODO make so any page hidden behind auth doesn't need to check for userId existing */
  const userId = session?.user?.id;

  if (userId) {
    return (
      <AppLayout>
        <ProjectForm userId={userId} />
      </AppLayout>
    );
  }
}
