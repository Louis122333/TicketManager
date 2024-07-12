import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';

const FormContainer = ({ title, children }) => {
    const theme = useTheme();

    return (
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
            <Box textAlign="center" mb={2}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </Box>
            {children}
        </Paper>
    );
};

export default FormContainer;