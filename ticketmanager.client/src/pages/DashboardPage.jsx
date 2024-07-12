import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Grid, Typography, Paper, Button, useTheme } from '@mui/material';
import TicketTypePieChart from '../components/tickets/TicketTypePieChart';
import TicketStatusPieChart from '../components/tickets/TicketStatusPieChart';
import DashboardTable from '../components/DashboardTable';
import UsersTable from '../components/users/UsersTable';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
    const { roles } = useAuth();
    const isAdmin = roles.includes('Administrator');
    const theme = useTheme();

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>Dashboard</Typography>
                {isAdmin && (
                    <Box sx={{ mb: 4 }}>
                        <Button
                            component={Link}
                            to="/create-user"
                            variant="contained"
                            sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}
                        >
                            Create New User
                        </Button>
                    </Box>
                )}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ mb: 4 }}>Tickets by type</Typography>
                        <Paper sx={{ p: 2 }}>
                            <TicketTypePieChart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ mb: 4 }}>Tickets by status</Typography>
                        <Paper sx={{ p: 2 }}>
                            <TicketStatusPieChart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 4 }}>Tickets</Typography>
                        <DashboardTable />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 4 }}>Users</Typography>
                        <UsersTable />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default DashboardPage;