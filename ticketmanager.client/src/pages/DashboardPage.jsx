import React from 'react';
import { Container, Box, Grid, Typography, Paper } from '@mui/material';
import TicketTypePieChart from '../components/TicketTypePieChart';
import TicketStatusPieChart from '../components/TicketStatusPieChart';
import DashboardTable from '../components/DashboardTable';

const DashboardPage = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>Dashboard</Typography>
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
                        <DashboardTable />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default DashboardPage;