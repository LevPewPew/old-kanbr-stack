import React from 'react';
import Layout from 'components/Layout';
import CreateTicketForm from 'components/create-ticket-form';

interface Props {}

export default function CreateTicket(props: Props) {
  return (
    <Layout>
      <div className="page">
        <h1>CREATE TICKET PAGE PLACEHOLDER</h1>
        <CreateTicketForm />
      </div>
    </Layout>
  );
}
