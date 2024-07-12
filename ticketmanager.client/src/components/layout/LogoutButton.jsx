import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button, useTheme } from '@mui/material';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Button onClick={handleLogout} sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>
            Logout
        </Button>
    );
};

export default LogoutButton;