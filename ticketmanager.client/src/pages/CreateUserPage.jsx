import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import CreateUserForm from '../components/users/CreateUserForm';
import { createUser } from '../services/api';
import PageTitle from '../components/layout/PageTitle';

const CreateUserPage = () => {
    const navigate = useNavigate();

    const handleCreateUser = async (userData) => {
        try {
            await createUser(userData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to create user', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <PageTitle title="Create User" />
                <CreateUserForm onCreate={handleCreateUser} />
            </Box>
        </Container>
    );
};

export default CreateUserPage;