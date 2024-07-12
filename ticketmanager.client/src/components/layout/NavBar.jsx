import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout, roles } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isLargeScreen = useMediaQuery('(min-width:1200px)');

    const handleBack = () => {
        navigate(-1);
    };

    const isAdminOrHelpDesk = roles.includes('Administrator') || roles.includes('HelpDesk');
    const isAdmin = roles.includes('Administrator');

    const getLinkStyle = (path) => ({
        textDecoration: location.pathname === path ? 'underline' : 'none',
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={handleBack}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                {isAuthenticated && [
                                    <MenuItem key="my-page" component={Link} to="/my-page" onClick={handleMenuClose} sx={getLinkStyle('/my-page')}>
                                        My Page
                                    </MenuItem>,
                                    isAdminOrHelpDesk && (
                                        <MenuItem key="dashboard" component={Link} to="/dashboard" onClick={handleMenuClose} sx={getLinkStyle('/dashboard')}>
                                            Dashboard
                                        </MenuItem>
                                    ),
                                    <MenuItem key="create-ticket" component={Link} to="/create-ticket" onClick={handleMenuClose} sx={getLinkStyle('/create-ticket')}>
                                        Create Ticket
                                    </MenuItem>,
                                    isAdmin && (
                                        <MenuItem key="create-user" component={Link} to="/create-user" onClick={handleMenuClose} sx={getLinkStyle('/create-user')}>
                                            Create User
                                        </MenuItem>
                                    ),
                                    <MenuItem key="logout" onClick={logout} sx={{ ml: 'auto' }}>
                                        Logout
                                    </MenuItem>
                                ]}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {isAuthenticated && (
                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                    <Button component={Link} to="/my-page" color="inherit" sx={getLinkStyle('/my-page')}>
                                        My Page
                                    </Button>
                                    {isAdminOrHelpDesk && (
                                        <Button component={Link} to="/dashboard" color="inherit" sx={getLinkStyle('/dashboard')}>
                                            Dashboard
                                        </Button>
                                    )}
                                    <Button component={Link} to="/create-ticket" color="inherit" sx={getLinkStyle('/create-ticket')}>
                                        Create Ticket
                                    </Button>
                                    {isAdmin && (
                                        <Button component={Link} to="/create-user" color="inherit" sx={getLinkStyle('/create-user')}>
                                            Create User
                                        </Button>
                                    )}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
                {isLargeScreen && (
                    <Typography
                        variant="h5"
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        Ticket Manager
                    </Typography>
                )}
                {!isMobile && isAuthenticated && (
                    <Button color="inherit" onClick={logout} sx={{ ml: 'auto' }}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;