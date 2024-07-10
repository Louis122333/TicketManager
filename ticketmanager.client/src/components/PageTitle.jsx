import React from 'react';
import { Typography, Box } from '@mui/material';

const PageTitle = ({ title }) => {
    return (
        <Box sx={{ mb: 4, mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
        </Box>
    );
};

export default PageTitle;