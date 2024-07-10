import { useState, useEffect } from 'react';
import { getTicketDetails, getUserDetails } from '../../services/api';

const useTicketDetails = (ticketId) => {
    const [ticket, setTicket] = useState(null);
    const [createdBy, setCreatedBy] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTicketDetails = async () => {
        setLoading(true);
        try {
            const ticketDetails = await getTicketDetails(ticketId);
            setTicket(ticketDetails);

            const createdByResponse = await getUserDetails(ticketDetails.createdBy);
            setCreatedBy(createdByResponse.fullName || 'Unknown');

            if (ticketDetails.assignedTo) {
                const assignedToResponse = await getUserDetails(ticketDetails.assignedTo);
                setAssignedTo(assignedToResponse.fullName || 'Unknown');
            } else {
                setAssignedTo('Unassigned');
            }

            const commentsWithUserDetails = await Promise.all(ticketDetails.comments.map(async (comment) => {
                const user = await getUserDetails(comment.createdBy);
                return {
                    ...comment,
                    createdByName: user.fullName || 'Unknown',
                };
            }));

            const sortedComments = commentsWithUserDetails.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));

            setTicket((prevTicket) => ({
                ...prevTicket,
                comments: sortedComments,
            }));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicketDetails();
    }, [ticketId]);

    return {
        ticket,
        createdBy,
        assignedTo,
        loading,
        error,
        fetchTicketDetails,
    };
};

export default useTicketDetails;