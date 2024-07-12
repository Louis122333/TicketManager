import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, CircularProgress, Typography, Box } from '@mui/material';
import CreatedTicketsTable from '../components/tickets/CreatedTicketsTable';
import AssignedTicketsTable from '../components/tickets/AssignedTicketsTable';
import useUserTickets from '../hooks/tickets/useUserTickets';
import useAssignedTickets from '../hooks/tickets/useAssignedTickets';
import { useAuth } from '../contexts/AuthContext';

const MyPage = () => {
    const { tickets, loading: userTicketsLoading, error: userTicketsError } = useUserTickets();

    const { roles, user } = useAuth();

    const isAdminOrHelpDesk = roles.includes('Administrator') || roles.includes('HelpDesk');
    
    const { tickets: assignedTickets = [], loading: assignedTicketsLoading } = isAdminOrHelpDesk
        ? useAssignedTickets()
        : { tickets: [], loading: false, error: null };

    if (userTicketsLoading || (isAdminOrHelpDesk && assignedTicketsLoading)) return <CircularProgress />;
    if (userTicketsError) return <Typography color="error">Error loading user tickets: {userTicketsError}</Typography>;

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4, mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>Welcome, {user?.firstName || 'User'}!</Typography>
            </Box>
            <Box sx={{ mb: 8, mt: 8 }}>
                <Button component={Link} to="/create-ticket" variant="contained" sx={{ mr: 2 }}>
                    Create New Ticket
                </Button>
                {isAdminOrHelpDesk && (
                    <Button component={Link} to="/dashboard" variant="contained">
                        Go To Dashboard
                    </Button>
                )}
            </Box>

            <Grid container spacing={4} justifyContent={tickets.length === 0 && assignedTickets.length === 0 ? 'center' : 'flex-start'}>
                <Grid item xs={12} md={isAdminOrHelpDesk ? 6 : 12}>
                    <Typography variant="h5" sx={{ mb: 4 }}>My created tickets</Typography>
                    {tickets.length > 0 ? (
                        <CreatedTicketsTable tickets={tickets} />
                    ) : (
                        <Typography variant="h6" color="textSecondary">
                            No created tickets available.
                        </Typography>
                    )}
                </Grid>
                {isAdminOrHelpDesk && (
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" sx={{ mb: 4 }}>My assigned tickets</Typography>
                        {assignedTickets.length > 0 ? (
                            <AssignedTicketsTable tickets={assignedTickets} />
                        ) : (
                            <Typography variant="h6" color="textSecondary">
                                No assigned tickets available.
                            </Typography>
                        )}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default MyPage;