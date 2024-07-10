import { useState, useEffect } from 'react';
import { getAllTickets } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const useAllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchTickets = async () => {
                try {
                    const data = await getAllTickets();
                    setTickets(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchTickets();
        }
    }, [isAuthenticated]);

    return { tickets, loading, error };
};

export default useAllTickets;