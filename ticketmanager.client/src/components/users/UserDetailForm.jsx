import React from 'react';
import { TextField, Button, Select, MenuItem, Typography, Box, Paper, FormControl, InputLabel, useTheme, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserDetailForm = ({ user, role, onRoleChange, onUpdate }) => {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            fullName: user.fullName,
            email: user.email,
            role: role,
        },
        validationSchema: Yup.object({
            role: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            onUpdate(values.role);
        },
    });

    const renderRoleOptions = () => {
        const roles = ["Administrator", "HelpDesk", "Guest"];
        return roles.map((role) => (
            <MenuItem key={role} value={role}>
                {role}
            </MenuItem>
        ));
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Update role for {user.fullName}</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Full Name"
                    value={formik.values.fullName}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Email"
                    value={formik.values.email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <FormControl fullWidth margin="dense" error={formik.touched.role && Boolean(formik.errors.role)}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={(e) => {
                            formik.setFieldValue('role', e.target.value);
                            onRoleChange(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        sx={{ backgroundColor: '#F2FDFF' }}
                    >
                        {renderRoleOptions()}
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                        <FormHelperText>{formik.errors.role}</FormHelperText>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}
                >
                    Update User
                </Button>
            </form>
        </Paper>
    );
};

export default UserDetailForm;