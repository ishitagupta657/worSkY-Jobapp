import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Work,
  Person,
  Logout,
  Dashboard,
  Add,
  Search
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleUserMenuClose();
  };

  // Don't render until auth is initialized
  if (loading) {
    return null;
  }

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getNavButtonStyle = (isActive) => ({
    color: 'white',
    textTransform: 'none',
    fontWeight: isActive ? 600 : 400,
    borderBottom: isActive ? '2px solid #ffd700' : 'none',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderBottom: '2px solid #ffd700'
    }
  });

  const renderMobileMenu = () => (
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={handleMobileMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
      }}
    >
      <MenuItem
        component={Link}
        to="/"
        onClick={handleMobileMenuClose}
        sx={{ py: 2 }}
      >
        <Work sx={{ mr: 2 }} />
        Home
      </MenuItem>
      
      {!currentUser ? (
        <>
          <MenuItem
            component={Link}
            to="/auth"
            onClick={handleMobileMenuClose}
            sx={{ py: 2 }}
          >
            <Person sx={{ mr: 2 }} />
            Sign In
          </MenuItem>
        </>
      ) : currentUser && (
        <>
          {currentUser.userType === 'employer' ? (
            <MenuItem
              component={Link}
              to="/employer/dashboard"
              onClick={handleMobileMenuClose}
              sx={{ py: 2 }}
            >
              <Dashboard sx={{ mr: 2 }} />
              Employer Dashboard
            </MenuItem>
          ) : (
            <MenuItem
              component={Link}
              to="/employee/feed"
              onClick={handleMobileMenuClose}
              sx={{ py: 2 }}
            >
              <Search sx={{ mr: 2 }} />
              Browse Jobs
            </MenuItem>
          )}
          <MenuItem
            onClick={handleLogout}
            sx={{ py: 2, color: 'error.main' }}
          >
            <Logout sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const renderUserMenu = () => {
    // Don't render if no currentUser
    if (!currentUser) return null;
    
    return (
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
          }
        }}
      >
        <MenuItem sx={{ py: 2, cursor: 'default' }}>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {currentUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser.email}
            </Typography>
            <Chip
              label={currentUser.userType === 'employer' ? 'Employer' : 'Job Seeker'}
              size="small"
              color={currentUser.userType === 'employer' ? 'primary' : 'secondary'}
              sx={{ mt: 1 }}
            />
          </Box>
        </MenuItem>
        
        {currentUser.userType === 'employer' ? (
          <MenuItem
            component={Link}
            to="/employer/dashboard"
            onClick={handleUserMenuClose}
            sx={{ py: 2 }}
          >
            <Dashboard sx={{ mr: 2 }} />
            Dashboard
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            to="/employee/feed"
            onClick={handleUserMenuClose}
            sx={{ py: 2 }}
          >
            <Search sx={{ mr: 2 }} />
            Browse Jobs
          </MenuItem>
        )}
        
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, color: 'error.main' }}
        >
          <Logout sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>
    );
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mr: 4
            }}
          >
            <Work sx={{ color: '#ffd700' }} />
            worSkY
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Button
                component={Link}
                to="/"
                sx={getNavButtonStyle(isActiveRoute('/'))}
              >
                Home
              </Button>
              
              <Button
                component={Link}
                to="/employee/feed"
                sx={getNavButtonStyle(isActiveRoute('/employee/feed'))}
              >
                Browse Jobs
              </Button>
              
              {currentUser?.userType === 'employer' && (
                <Button
                  component={Link}
                  to="/employer/dashboard"
                  sx={getNavButtonStyle(isActiveRoute('/employer/dashboard'))}
                >
                  Employer Dashboard
                </Button>
              )}
            </Box>
          )}

          {/* Right Side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!currentUser ? (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                startIcon={<Person />}
                sx={{
                  background: '#ffd700',
                  color: '#1a237e',
                  fontWeight: 600,
                  '&:hover': {
                    background: '#ffed4e'
                  }
                }}
              >
                Sign In
              </Button>
            ) : currentUser && (
              <>
                {currentUser.userType === 'employer' && (
                  <Button
                    component={Link}
                    to="/employer/dashboard"
                    variant="outlined"
                    startIcon={<Add />}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: '#ffd700',
                        color: '#ffd700'
                      }
                    }}
                  >
                    Post Job
                  </Button>
                )}
                
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    color: 'white',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      borderColor: '#ffd700'
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: '#ffd700',
                      color: '#1a237e',
                      fontWeight: 600
                    }}
                  >
                    {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleMobileMenuOpen}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      {renderMobileMenu()}

      {/* User Menu */}
      {renderUserMenu()}
    </AppBar>
  );
};

export default Navbar;
