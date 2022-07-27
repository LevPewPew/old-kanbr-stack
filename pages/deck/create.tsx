import React from 'react';
import Layout from 'components/Layout';
import CreateCardForm from 'components/create-card-form';

interface Props {}

export default function CreateCard(props: Props) {
  return (
    <Layout>
      <div className="page">
        <CreateCardForm />
      </div>
    </Layout>
  );
}
