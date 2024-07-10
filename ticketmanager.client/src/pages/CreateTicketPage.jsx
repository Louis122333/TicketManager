import React from 'react';
import useCreateTicket from '../hooks/tickets/useCreateTicket';
import CreateTicket from '../components/CreateTicket';
import PageTitle from '../components/PageTitle';

const CreateTicketPage = () => {
    const { handleCreateTicket, error } = useCreateTicket();

    return (
        <>
            <CreateTicket onCreate={handleCreateTicket} />
        </>
    );
};

export default CreateTicketPage;