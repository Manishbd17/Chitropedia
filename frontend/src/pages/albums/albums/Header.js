import React from "react"
import { Link,useLocation } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search); 
    const id = queryParams.get('id'); 


    return (
        <AppBar position = 'static'>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                 Photo Gallery
            </Typography>
            <Button
                component={Link}
                to={`/albums/show?id=${id}`}
                color="inherit"
                variant="contained"
                sx={{ mr: 2, backgroundColor: '#799edc', '&:hover': { backgroundColor: '#2f6ad0' } }}
                >
                Show Photos
            </Button>
  
            <Button
                component={Link}
                to={`/albums/upload?id=${id}`}
                color="inherit"
                variant="contained"
                sx={{ mr: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
                >
                Upload Photos
            </Button>

            <Button
                component={Link}
                to={`/albums/delete?id=${id}`}
                color="inherit"
                variant="contained"
                sx={{ backgroundColor: '#F44336', '&:hover': { backgroundColor: '#D32F2F' } }}
                >
                Delete Photos
            </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header; 