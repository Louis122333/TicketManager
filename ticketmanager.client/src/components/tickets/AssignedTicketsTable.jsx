import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';

const AssignedTicketsTable = ({ tickets }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const handleRowClick = (id) => {
        navigate(`/tickets/${id}`);
    };
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>Number</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>Title</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>Status</TableCell>
                        <TableCell sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>Priority</TableCell>
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
                            <TableCell>{ticket.priority}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AssignedTicketsTable;