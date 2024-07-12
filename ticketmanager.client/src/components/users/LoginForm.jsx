import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Box, useTheme } from '@mui/material';

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
        <Paper elevation={3} sx={{ p: 3 }}>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <form onSubmit={formik.handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
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
                        Login
                    </Button>
                </form>
            </Box>
        </Paper>
    );
};

export default LoginForm;