import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Box, Paper, useTheme } from '@mui/material';

const RegisterForm = ({ onRegister }) => {
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('Required')
            .min(2, 'Must be at least 2 characters')
            .max(50, 'Must be 50 characters or less')
            .matches(/^[A-Z]/, 'Must start with an uppercase letter'),
        lastName: Yup.string()
            .required('Required')
            .min(2, 'Must be at least 2 characters')
            .max(50, 'Must be 50 characters or less')
            .matches(/^[A-Z]/, 'Must start with an uppercase letter'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .max(128, 'Must be 128 characters or less'),
        password: Yup.string()
            .required('Required')
            .min(8, 'Must be at least 8 characters'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onRegister(values);
        },
    });

    const theme = useTheme();

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={2} sx={{ p: 4 }}>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterForm;