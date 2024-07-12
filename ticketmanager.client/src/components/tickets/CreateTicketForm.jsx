import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Typography, Box, MenuItem, Grid, Paper, useTheme } from '@mui/material';

const CreateTicketForm = ({ onCreate }) => {
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Required')
            .max(50, 'Must be 50 characters or less'),
        description: Yup.string()
            .required('Required')
            .max(200, 'Must be 200 characters or less'),
        type: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            type: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onCreate(values);
        },
    });

    const theme = useTheme();

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 8 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <form onSubmit={formik.handleSubmit}>
                                <Typography variant="h5" gutterBottom>
                                    Create a New Ticket
                                </Typography>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    id="title"
                                    name="title"
                                    label="Title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                    InputProps={{
                                        style: { backgroundColor: '#F2FDFF' },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    InputProps={{
                                        style: { backgroundColor: '#F2FDFF' },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    id="type"
                                    name="type"
                                    label="Type"
                                    select
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}
                                    InputProps={{
                                        style: { backgroundColor: '#F2FDFF' },
                                    }}
                                >
                                    <MenuItem value="Request">Request</MenuItem>
                                    <MenuItem value="Incident">Incident</MenuItem>
                                </TextField>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}
                                >
                                    Create Ticket
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Information
                            </Typography>
                            <Typography variant="body1" gutterBottom align="left">
                                <strong>Title:</strong> Provide a concise and clear title that summarizes the issue or request. This helps in quickly identifying and categorizing the ticket.
                            </Typography>
                            <Typography variant="body1" align="left">
                                <strong>Description:</strong> Offer a detailed description of the issue or request. Include all relevant information that could help in addressing your ticket efficiently.
                            </Typography>
                            <Typography variant="body1" gutterBottom align="left">
                                <strong>When to choose "Incident":</strong> An incident refers to an unplanned interruption to a service or reduction in the quality of a service. If you are facing an issue that disrupts normal operations, select this option.
                            </Typography>
                            <Typography variant="body1" gutterBottom align="left">
                                <strong>When to choose "Request":</strong> A request is a formal appeal for something needed. Use this option when you need a new service, access, or information.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CreateTicketForm;