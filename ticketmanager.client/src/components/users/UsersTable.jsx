import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import useUsers from '../../hooks/users/useUsers';
import { useAuth } from '../../contexts/AuthContext';

const UsersTable = () => {
    const { users, loading, error } = useUsers();
    const navigate = useNavigate();
    const { roles } = useAuth();
    const isAdministrator = roles.includes('Administrator');

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading users: {error}</Typography>;

    const handleRowClick = (userId) => {
        if (isAdministrator) {
            navigate(`/users/${userId}`);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.userId}
                            hover={isAdministrator}
                            onClick={() => handleRowClick(user.userId)}
                            style={{ cursor: isAdministrator ? 'pointer' : 'default' }}
                        >
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;