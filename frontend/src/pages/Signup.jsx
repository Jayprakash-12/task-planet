import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, IconButton, InputAdornment } from '@mui/material';
import { Person, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f6f8fd 0%, #f1f6fd 100%)',
    }}>
      <Container maxWidth="xs" disableGutters sx={{ px: { xs: 2, sm: 0 } }}>
        <Paper elevation={0} sx={{ 
          p: { xs: 4, md: 5 }, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid rgba(255, 255, 255, 0.4)'
        }}>
          
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join Task Planet today.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              placeholder="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: '#f8fafc', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'primary.main' } }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: '#f8fafc', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'primary.main' } }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'action.active' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: '#f8fafc', '& fieldset': { borderColor: 'transparent' }, '&:hover fieldset': { borderColor: 'primary.main' } }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{ 
                mt: 4, 
                mb: 3, 
                py: 1.8, 
                borderRadius: 3, 
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #1976d2 0%, #2196f3 100%)',
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(33, 150, 243, 0.39)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(33, 150, 243, 0.39)',
                }
              }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ fontWeight: 500 }}>
              Already have an account?{' '}
              <Link style={{color: '#1976d2', textDecoration: 'none', fontWeight: 600}} to="/login">
                Log in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
