import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, CircularProgress, Typography, Box } from '@mui/material';
import CreatedTicketsTable from '../components/CreatedTicketsTable';
import AssignedTicketsTable from '../components/AssignedTicketsTable';
import useUserTickets from '../hooks/tickets/useUserTickets';
import useAssignedTickets from '../hooks/tickets/useAssignedTickets';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/PageTitle';

const MyPage = () => {
    const { tickets, loading: userTicketsLoading, error: userTicketsError } = useUserTickets();
    const { roles } = useAuth();

    const isAdminOrHelpDesk = roles.includes('Administrator') || roles.includes('HelpDesk');

    const { tickets: assignedTickets, loading: assignedTicketsLoading, error: assignedTicketsError } = isAdminOrHelpDesk
        ? useAssignedTickets()
        : { tickets: [], loading: false, error: null };

    if (userTicketsLoading || assignedTicketsLoading) return <CircularProgress />;
    if (userTicketsError) return <Typography color="error">Error loading user tickets: {userTicketsError}</Typography>;
    if (isAdminOrHelpDesk && assignedTicketsError) return <Typography color="error">Error loading assigned tickets: {assignedTicketsError}</Typography>;

    return (
        <Container maxWidth="lg">
            <PageTitle title="My Page" />
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Button component={Link} to="/create-ticket" variant="contained" color="primary">
                    Create New Ticket
                </Button>
                {isAdminOrHelpDesk && (
                    <Button component={Link} to="/dashboard" variant="contained" color="primary">
                        Go To Dashboard
                    </Button>
                )}
            </Box>
            <Grid container spacing={4}>
                {tickets.length > 0 && (
                    <Grid item xs={12} md={isAdminOrHelpDesk ? 6 : 12}>
                        <CreatedTicketsTable tickets={tickets} />
                    </Grid>
                )}
                {isAdminOrHelpDesk && assignedTickets.length > 0 && (
                    <Grid item xs={12} md={6}>
                        <AssignedTicketsTable tickets={assignedTickets} />
                    </Grid>
                )}
                {tickets.length === 0 && (
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <Typography variant="h6" color="textSecondary">
                                No tickets available.
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default MyPage;