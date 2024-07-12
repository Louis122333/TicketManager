import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useAllTickets from '../hooks/tickets/useAllTickets';

const DashboardTable = () => {
    const { tickets, loading, error } = useAllTickets();
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tickets: {error}</p>;

    const handleRowClick = (ticketId) => {
        navigate(`/tickets/${ticketId}`);
    };
    

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Updated</TableCell>
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