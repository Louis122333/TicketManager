import React from 'react';
import useCreateTicket from '../hooks/tickets/useCreateTicket';
import CreateTicketForm from '../components/tickets/CreateTicketForm';
import { Container, Box } from '@mui/material';
import PageTitle from '../components/layout/PageTitle';

const CreateTicketPage = () => {
    const { handleCreateTicket } = useCreateTicket();

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 8 }}>
                <PageTitle title="Ticket" />
                <CreateTicketForm onCreate={handleCreateTicket} />
            </Box>
        </Container>

    );
};

export default CreateTicketPage;

