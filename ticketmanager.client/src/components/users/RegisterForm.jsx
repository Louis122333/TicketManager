import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, useTheme } from '@mui/material';
import FormContainer from '../layout/FormContainer';

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
        <FormContainer title="Create Your Account">
            <form onSubmit={formik.handleSubmit}>
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
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
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
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
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
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
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
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
                />
                <Box mt={3}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}
                    >
                        Register
                    </Button>
                </Box>
            </form>
        </FormContainer>
    );
};

export default RegisterForm;