import { useState, useEffect } from 'react';
import { getUserTickets } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const useUserTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const fetchTickets = async () => {
                try {
                    const data = await getUserTickets();
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

export default useUserTickets;