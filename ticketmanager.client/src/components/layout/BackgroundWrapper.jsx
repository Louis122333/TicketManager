import React from 'react';
import { Box } from '@mui/material';

const BackgroundWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'radial-gradient(circle, rgba(173, 216, 230, 1) 0%, rgba(173, 216, 230, 0.8) 50%, rgba(173, 216, 230, 0.5) 70%, rgba(173, 216, 230, 0.3) 90%, rgba(173, 216, 230, 0) 100%)',
                padding: 2,
            }}
        >
            {children}
        </Box>
    );
};

export default BackgroundWrapper;