import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
          Task Planet
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
                  {user.name}
                </Typography>
              </Box>
              <Button onClick={logout} variant="outlined" size="small" sx={{ borderRadius: 2 }}>Logout</Button>
            </>
          ) : (
            <Button onClick={() => navigate('/login')} variant="contained" size="small" sx={{ borderRadius: 2 }}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
