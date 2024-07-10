import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    
    const { isAuthenticated, logout } = useAuth();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="back"
                    onClick={handleBack}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Ticket Manager
                </Typography>
                {isAuthenticated && (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;