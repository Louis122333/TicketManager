import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import useRegister from '../hooks/auth/useRegister';
import RegisterForm from '../components/users/RegisterForm';

const RegisterPage = () => {
    const { handleRegister, error } = useRegister();

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box textAlign="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Create your account
                </Typography>
            </Box>
            <RegisterForm onRegister={handleRegister} />
            {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
            <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link to="/login">
                        <Button variant="text" color="primary">Login</Button>
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;