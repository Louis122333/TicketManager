import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, MenuItem, Select, FormControl, InputLabel, useTheme } from '@mui/material';
import FormContainer from '../layout/FormContainer';

const CreateUserForm = ({ onCreate }) => {
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('Required')
            .min(2, 'Must be at least 2 characters')
            .max(50, 'Must be 50 characters or less')
            .matches(/^[A-Z]/, 'Must start with an uppercase letter'),
        lastName: Yup.string()
            .required('Required')
            .min(2, 'Must be at least 2 characters')
            .max(50, 'Must be 50 characters or less')
            .matches(/^[A-Z]/, 'Must start with an uppercase letter'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .max(128, 'Must be 128 characters or less'),
        password: Yup.string()
            .required('Required')
            .min(8, 'Must be at least 8 characters'),
        role: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'Guest',
        },
        validationSchema,
        onSubmit: (values) => {
            onCreate(values);
        },
    });

    const theme = useTheme();

    return (
        <FormContainer title="New User">
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                        style: { backgroundColor: '#F2FDFF' }
                    }}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        sx={{
                            backgroundColor: '#F2FDFF',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F2FDFF',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.error.main,
                            },
                        }}
                    >
                        <MenuItem value="Guest">Guest</MenuItem>
                        <MenuItem value="HelpDesk">HelpDesk</MenuItem>
                        <MenuItem value="Administrator">Administrator</MenuItem>
                    </Select>
                </FormControl>
                <Box mt={3}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.contrastText }}
                    >
                        Create User
                    </Button>
                </Box>
            </form>
        </FormContainer>
    );
};

export default CreateUserForm;