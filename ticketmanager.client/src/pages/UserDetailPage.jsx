import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { getUserDetails, updateUser } from '../services/api';
import PageTitle from '../components/layout/PageTitle';
import { useAuth } from '../contexts/AuthContext';
import UserDetailForm from '../components/users/UserDetailForm';

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

    const handleUpdate = async (updatedRole) => {
        try {
            await updateUser(userId, updatedRole);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    if (!isAdministrator) {
        return <Typography color="error">Unauthorized access</Typography>;
    }

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8 }}>
                <PageTitle title="User Details" />
                {user && (
                    <UserDetailForm
                        user={user}
                        role={role}
                        onRoleChange={setRole}
                        onUpdate={handleUpdate}
                    />
                )}
            </Box>
        </Container>
    );
};

export default UserDetailPage;