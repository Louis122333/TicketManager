import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTicketDetails from '../hooks/tickets/useTicketDetails';
import { assignToUser, updateTicketPriority, updateTicketStatus, getUserDetails, createComment } from '../services/api';
import { Container, Typography, Box, CircularProgress, TextField, Button, Avatar, Paper } from '@mui/material';
import TicketDetailTable from '../components/TicketDetailTable';
import { useAuth } from '../contexts/AuthContext';
import PageTitle from '../components/PageTitle';

const TicketDetailPage = () => {
    const { ticketId } = useParams();
    const { ticket, loading, error, fetchTicketDetails } = useTicketDetails(ticketId);
    const { user, roles, isInitialized } = useAuth();
    const [createdBy, setCreatedBy] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [commentText, setCommentText] = useState('');
    const [commentError, setCommentError] = useState('');
    const [commentRoles, setCommentRoles] = useState({});

    useEffect(() => {
        if (ticket) {
            setStatus(ticket.status);
            setPriority(ticket.priority);

            getUserDetails(ticket.createdBy).then((data) => {
                setCreatedBy(data.fullName);
            });

            if (ticket.assignedTo) {
                getUserDetails(ticket.assignedTo).then((data) => {
                    setAssignedTo(data.fullName);
                });
            } else {
                setAssignedTo('Unassigned');
            }

            // Fetch roles for comment creators
            if (ticket.comments) {
                const fetchCommentRoles = async () => {
                    const rolesData = {};
                    for (const comment of ticket.comments) {
                        const userData = await getUserDetails(comment.createdBy);
                        rolesData[comment.createdBy] = userData.role;
                    }
                    setCommentRoles(rolesData);
                };
                fetchCommentRoles();
            }
        }
    }, [ticket]);

    const handleStatusUpdate = async () => {
        await updateTicketStatus(ticketId, status);
        fetchTicketDetails();
    };

    const handlePriorityUpdate = async () => {
        await updateTicketPriority(ticketId, priority);
        fetchTicketDetails();
    };

    const handleSelfAssign = async () => {
        await assignToUser(ticketId);
        fetchTicketDetails();
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        try {
            await createComment(ticketId, commentText);
            setCommentText('');
            fetchTicketDetails();  // Refresh ticket details to get the new comment
        } catch (err) {
            setCommentError(err.message || 'Failed to add comment');
        }
    };

    if (!isInitialized) {
        return <CircularProgress />;
    }

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((n) => n[0]).join('');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <PageTitle title="Ticket Details" />
                <TicketDetailTable
                    ticket={ticket}
                    status={status}
                    setStatus={setStatus}
                    priority={priority}
                    setPriority={setPriority}
                    handleStatusUpdate={handleStatusUpdate}
                    handlePriorityUpdate={handlePriorityUpdate}
                    handleSelfAssign={handleSelfAssign}
                    userRoles={roles}
                    createdBy={createdBy}
                    assignedTo={assignedTo}
                />
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Add a Comment</Typography>
                    {commentError && <Typography color="error">{commentError}</Typography>}
                    <form onSubmit={handleCommentSubmit}>
                        <TextField
                            label="Comment"
                            multiline
                            fullWidth
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            sx={{ mt: 2, mb: 2 }}
                        />
                        <Button type="submit" variant="contained" color="primary">Add Comment</Button>
                    </form>
                    <Typography variant="h6" sx={{ mt: 4 }}>Comments</Typography>
                    {ticket.comments && ticket.comments.length > 0 ? (
                        ticket.comments.map(comment => (
                            <Paper key={comment.commentId} sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px', overflowWrap: 'break-word' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ mr: 2 }}>
                                            {comment.createdByName ? getInitials(comment.createdByName).toUpperCase() : 'U'}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1">{comment.createdByName || 'Unknown'}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {commentRoles[comment.createdBy] || 'Unknown Role'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(comment.createdDateTime).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ mt: 1, textAlign: 'left' }}>{comment.text}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography>No comments available</Typography>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default TicketDetailPage;