import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTicketDetails from '../hooks/tickets/useTicketDetails';
import { assignToUser, updateTicketPriority, updateTicketStatus, getUserDetails } from '../services/api';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import TicketDetailTable from '../components/tickets/TicketDetailTable';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/layout/PageTitle';
import CommentSection from '../components/tickets/CommentSection';

const TicketDetailPage = () => {
    const { ticketId } = useParams();
    const { ticket, loading, error, fetchTicketDetails } = useTicketDetails(ticketId);
    const { roles, isInitialized } = useAuth();
    const [createdBy, setCreatedBy] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        if (ticket) {
            setStatus(ticket.status);
            setPriority(ticket.priority);

            getUserDetails(ticket.createdBy).then((data) => {
                setCreatedBy(data.fullName);
            });

            if (ticket.assignedTo) {
                getUserDetails(ticket.assignedTo).then((data) => {
                    setAssignedTo(data.fullName);
                });
            } else {
                setAssignedTo('Unassigned');
            }
        }
    }, [ticket]);

    const handleStatusUpdate = async () => {
        await updateTicketStatus(ticketId, status);
        fetchTicketDetails();
    };

    const handlePriorityUpdate = async () => {
        await updateTicketPriority(ticketId, priority);
        fetchTicketDetails();
    };

    const handleSelfAssign = async () => {
        await assignToUser(ticketId);
        fetchTicketDetails();
    };

    if (!isInitialized) {
        return <CircularProgress />;
    }

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <PageTitle title="Ticket Details" />
                <TicketDetailTable
                    ticket={ticket}
                    status={status}
                    setStatus={setStatus}
                    priority={priority}
                    setPriority={setPriority}
                    handleStatusUpdate={handleStatusUpdate}
                    handlePriorityUpdate={handlePriorityUpdate}
                    handleSelfAssign={handleSelfAssign}
                    userRoles={roles}
                    createdBy={createdBy}
                    assignedTo={assignedTo}
                />
                <CommentSection 
                    ticketId={ticketId} 
                    comments={ticket.comments} 
                    fetchTicketDetails={fetchTicketDetails} 
                />
            </Box>
        </Container>
    );
};

export default TicketDetailPage;