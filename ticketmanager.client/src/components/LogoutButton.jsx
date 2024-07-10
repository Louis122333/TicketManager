import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@mui/material';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Button onClick={handleLogout} variant="contained" color="primary" sx={{ mt: 2 }}>
            Logout
        </Button>
    );
};

export default LogoutButton;