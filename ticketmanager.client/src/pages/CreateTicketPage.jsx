import React from 'react';
import useCreateTicket from '../hooks/tickets/useCreateTicket';
import CreateTicketForm from '../components/tickets/CreateTicketForm';

const CreateTicketPage = () => {
    const { handleCreateTicket } = useCreateTicket();

    return (
        <>
            <CreateTicketForm onCreate={handleCreateTicket} />
        </>
    );
};

export default CreateTicketPage;