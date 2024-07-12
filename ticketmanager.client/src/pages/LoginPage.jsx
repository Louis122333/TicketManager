import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import useLogin from '../hooks/auth/useLogin';
import LoginForm from '../components/users/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/my-page');
    };

    const { handleLogin, error } = useLogin(handleLoginSuccess);

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box textAlign="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Welcome
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Login to your account
                </Typography>
            </Box>
            <LoginForm onLogin={handleLogin} />
            {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
            <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link to="/register">
                        <Button variant="text" color="primary">Register</Button>
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;