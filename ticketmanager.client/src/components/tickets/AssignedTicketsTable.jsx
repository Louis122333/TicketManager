import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AssignedTicketsTable = ({ tickets }) => {
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/tickets/${id}`);
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