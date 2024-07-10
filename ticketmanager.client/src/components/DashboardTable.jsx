import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import useAllTickets from '../hooks/tickets/useAllTickets';

const DashboardTable = () => {
    const { tickets, loading, error } = useAllTickets();
    const navigate = useNavigate();
    const theme = useTheme();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tickets: {error}</p>;

    const handleRowClick = (ticketId) => {
        navigate(`/tickets/${ticketId}`);
    };
    

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Number</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Title</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Status</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Priority</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Created</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets && tickets.map((ticket) => (
                        <TableRow 
                            key={ticket.ticketId} 
                            hover 
                            onClick={() => handleRowClick(ticket.ticketId)}
                            style={{ cursor: 'pointer' }}
                        >
                            <TableCell>{ticket.referenceNumber}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell>{ticket.priority}</TableCell>
                            <TableCell>{new Date(ticket.createdDateTime).toLocaleString()}</TableCell>
                            <TableCell>{new Date(ticket.updatedDateTime).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DashboardTable;