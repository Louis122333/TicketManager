import { useState } from 'react';
import { createTicket as createTicketApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const useCreateTicket = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreateTicket = async (values) => {
        try {
            await createTicketApi(values.title, values.description, values.type);
            navigate('/my-page');
        } catch (err) {
            setError(err.message || 'Failed to create ticket');
        }
    };

    return {
        handleCreateTicket,
        error,
    };
};

export default useCreateTicket;