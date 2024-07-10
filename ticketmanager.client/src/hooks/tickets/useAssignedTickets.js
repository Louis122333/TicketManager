import { useState, useEffect } from 'react';
import { getAssignedTickets } from '../../services/api';

const useAssignedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignedTickets = async () => {
            try {
                const data = await getAssignedTickets();
                setTickets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedTickets();
    }, []);

    return { tickets, loading, error };
};

export default useAssignedTickets;