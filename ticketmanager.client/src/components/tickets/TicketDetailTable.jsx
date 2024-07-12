import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button, Paper, TextField } from '@mui/material';

const TicketDetailTable = ({ ticket, status, setStatus, priority, setPriority, handleStatusUpdate, handlePriorityUpdate, handleSelfAssign, userRoles, createdBy, assignedTo }) => {
    const isGuest = userRoles.includes('Guest');

    return (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell>Value</TableCell>
                        {!isGuest && <TableCell>Action</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>{ticket.referenceNumber}</TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>
                            {isGuest ? (
                                status
                            ) : (
                                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <MenuItem value="AwaitingApproval">Awaiting Approval</MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                    <MenuItem value="WorkInProgress">Work In Progress</MenuItem>
                                    <MenuItem value="ClosedComplete">Closed Complete</MenuItem>
                                    <MenuItem value="ClosedIncomplete">Closed Incomplete</MenuItem>
                                    <MenuItem value="Canceled">Canceled</MenuItem>
                                </Select>
                            )}
                        </TableCell>
                        {!isGuest && <TableCell>
                            <Button variant='contained' onClick={handleStatusUpdate}>Update</Button>
                        </TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                value={ticket.description}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>{ticket.type}</TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                    {!isGuest && (
                        <TableRow>
                            <TableCell>Priority</TableCell>
                            <TableCell>
                                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={handlePriorityUpdate}>Update</Button>
                            </TableCell>
                        </TableRow>
                    )}
                    <TableRow>
                        <TableCell>Created By</TableCell>
                        <TableCell>{createdBy}</TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>{assignedTo}</TableCell>
                        {!isGuest && <TableCell><Button variant='contained' onClick={handleSelfAssign}>Assign Me</Button></TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>{new Date(ticket.createdDateTime).toLocaleString()}</TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                    <TableRow>
                        <TableCell>Updated At</TableCell>
                        <TableCell>{new Date(ticket.updatedDateTime).toLocaleString()}</TableCell>
                        {!isGuest && <TableCell></TableCell>}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TicketDetailTable;