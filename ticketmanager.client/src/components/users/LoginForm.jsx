import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, useTheme } from '@mui/material';
import FormContainer from '../layout/FormContainer';

const LoginForm = ({ onLogin }) => {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onLogin(values);
        },
    });

    const theme = useTheme();

    return (
        <FormContainer title="Login to Your Account">
            <form onSubmit={formik.handleSubmit}>
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
                        Login
                    </Button>
                </Box>
            </form>
        </FormContainer>
    );
};

export default LoginForm;