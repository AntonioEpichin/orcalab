import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const MyAppBar = () => {
    return (
        <AppBar position="static" sx={{backgroundColor:'#41733F'}} >
            <Toolbar>
                <Typography variant="h6" component="div">
                    My App
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default MyAppBar;