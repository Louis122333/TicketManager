import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Avatar, Paper, useTheme } from '@mui/material';
import { createComment, getUserDetails } from '../../services/api';

const CommentSection = ({ ticketId, comments, fetchTicketDetails }) => {
    const [commentRoles, setCommentRoles] = useState({});
    const theme = useTheme();

    useEffect(() => {
        if (comments) {
            const fetchCommentRoles = async () => {
                const rolesData = {};
                for (const comment of comments) {
                    const userData = await getUserDetails(comment.createdBy);
                    rolesData[comment.createdBy] = userData.role;
                }
                setCommentRoles(rolesData);
            };
            fetchCommentRoles();
        }
    }, [comments]);

    const validationSchema = Yup.object({
        commentText: Yup.string()
            .required('Comment is required')
            .min(1, 'Comment must be at least 1 character')
            .max(250, 'Comment must be 250 characters or less'),
    });

    const formik = useFormik({
        initialValues: {
            commentText: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await createComment(ticketId, values.commentText);
                resetForm();
                fetchTicketDetails();
            } catch (err) {
                formik.setFieldError('commentText', err.message || 'Failed to add comment');
            }
        },
    });

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map((n) => n[0]).join('');
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Add a Comment</Typography>
            <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="Comment"
                        multiline
                        fullWidth
                        id="commentText"
                        name="commentText"
                        value={formik.values.commentText}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.commentText && Boolean(formik.errors.commentText)}
                        helperText={formik.touched.commentText && formik.errors.commentText}
                        sx={{
                            mt: 2,
                            mb: 2,
                            '& .MuiInputBase-root': {
                                backgroundColor: '#F2FDFF',
                            },
                            '& .MuiFormHelperText-root': {
                                margin: 0,
                                padding: '0 14px',
                                backgroundColor: 'inherit',
                            },
                        }}
                    />
                    <Button variant='contained' type="submit" sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>Add Comment</Button>
                </form>
            </Paper>
            <Typography variant="h6" sx={{ mt: 4 }}>Comments</Typography>
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <Paper key={comment.commentId} sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px', overflowWrap: 'break-word' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 2, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>
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
    );
};

export default CommentSection;