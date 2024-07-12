import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Select, MenuItem, Button, Paper, TextField } from '@mui/material';
import { getUserDetails, updateUser } from '../services/api';
import PageTitle from '../components/layout/PageTitle';
import { useAuth } from '../contexts/AuthContext';

const UserDetailPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { roles } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [role, setRole] = useState('');

    const isAdministrator = roles.includes('Administrator');

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) {
                setError('User ID is not defined.');
                setLoading(false);
                return;
            }

            try {
                const data = await getUserDetails(userId);
                setUser(data);
                setRole(data.role);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleUpdate = async () => {
        try {
            await updateUser(userId, role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const renderRoleOptions = () => {
        const roles = ["Administrator", "HelpDesk", "Guest"];
        return roles.map((role) => (
            <MenuItem key={role} value={role}>
                {role}
            </MenuItem>
        ));
    };

    if (!isAdministrator) {
        return <Typography color="error">Unauthorized access</Typography>;
    }

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <PageTitle title="User Details" />
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>Update {user.fullName}</Typography>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Full Name"
                        value={user.fullName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Email"
                        value={user.email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Select
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        {renderRoleOptions()}
                    </Select>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        sx={{ mt: 2 }}
                    >
                        Update User
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default UserDetailPage;