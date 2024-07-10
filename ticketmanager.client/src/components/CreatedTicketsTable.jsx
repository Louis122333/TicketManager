import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const CreatedTicketsTable = ({ tickets }) => {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/tickets/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }}>Number</TableCell>
                        <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }}>Title</TableCell>
                        <TableCell sx={{ backgroundColor: 'primary.main', color: 'white' }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.ticketId}
                            hover
                            onClick={() => handleRowClick(ticket.ticketId)}
                            style={{ cursor: 'pointer' }}>
                            <TableCell>{ticket.referenceNumber}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreatedTicketsTable;