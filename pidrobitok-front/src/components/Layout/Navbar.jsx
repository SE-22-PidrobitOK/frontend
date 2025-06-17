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
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Registration/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isStudent, isEmployer } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  // Формуємо пункти меню залежно від ролі користувача
  const getMenuItems = () => {
    const baseItems = [
      { label: 'Про нас', path: '/about', icon: null },
      { label: 'Контакти', path: '/contacts', icon: null }
    ];

    if (isAuthenticated) {
      if (isStudent) {
        return [
          { label: 'Вакансії', path: '/vacancies', icon: <WorkIcon /> },
          ...baseItems
        ];
      } else if (isEmployer) {
        return [
          { label: 'Дашборд', path: '/employer-dashboard', icon: <DashboardIcon /> },
          ...baseItems
        ];
      }
    }

    // Для неавтентифікованих користувачів
    return [
      { label: 'Вакансії', path: '/vacancies', icon: <WorkIcon /> },
      ...baseItems
    ];
  };

  const menuItems = getMenuItems();

  const MobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: '#1c2526',
          color: 'white'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
            JobPortal
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
        
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.label} 
              button 
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              {item.icon && (
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </Box>
              )}
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontFamily: 'Rubik',
                  fontWeight: 500
                }}
              />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', my: 2 }} />
        
        {!isAuthenticated ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleNavigation('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontFamily: 'Rubik',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Увійти
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleNavigation('/registration')}
              sx={{
                backgroundColor: 'white',
                color: '#1c2526',
                fontFamily: 'Rubik',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Реєстрація
            </Button>
          </Box>
        ) : (
          <Box>
            {/* Інформація про користувача */}
            <Box sx={{ mb: 2, p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                Привіт, {user.firstName}!
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                {user.role === 'student' ? 'Студент' : 'Роботодавець'}
              </Typography>
            </Box>
            
            <ListItem 
              button 
              onClick={() => handleNavigation('/profile')}
              sx={{ 
                borderRadius: 1, 
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
              <ListItemText 
                primary="Мій профіль" 
                primaryTypographyProps={{
                  fontFamily: 'Rubik',
                  fontWeight: 500
                }}
              />
            </ListItem>
            
            {isStudent && (
              <ListItem 
                button 
                onClick={() => handleNavigation('/my-applications')}
                sx={{ 
                  borderRadius: 1, 
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <ListItemText 
                  primary="Мої відгуки" 
                  primaryTypographyProps={{
                    fontFamily: 'Rubik',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            )}
            
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{ 
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemText 
                primary="Вийти" 
                primaryTypographyProps={{
                  fontFamily: 'Rubik',
                  fontWeight: 500
                }}
              />
            </ListItem>
          </Box>
        )}
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{ 
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component="div"
            onClick={() => handleNavigation('/')}
            sx={{
              fontFamily: 'Rubik',
              fontWeight: 700,
              color: '#1c2526',
              cursor: 'pointer',
              flexGrow: isMobile ? 1 : 0,
              mr: { md: 4 }
            }}
          >
            JobPortal
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box sx={{ display: 'flex', gap: 3, flexGrow: 1, ml: 4 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: '#1c2526',
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      textTransform: 'none',
                      fontSize: '16px',
                      '&:hover': {
                        backgroundColor: 'rgba(28, 37, 38, 0.04)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* Desktop Auth Buttons */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => handleNavigation('/login')}
                      sx={{
                        borderColor: '#1c2526',
                        color: '#1c2526',
                        fontFamily: 'Rubik',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#1c2526',
                          color: 'white'
                        }
                      }}
                    >
                      Увійти
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleNavigation('/registration')}
                      sx={{
                        borderColor: '#1c2526',
                        color: '#1c2526',
                        fontFamily: 'Rubik',
                        fontWeight: 500,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#1c2526',
                          color: 'white',
                          borderColor: '#1c2526'
                        }
                      }}
                    >
                      Реєстрація
                    </Button>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Привітання користувача */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#1c2526', 
                          fontFamily: 'Rubik',
                          fontWeight: 500 
                        }}
                      >
                        Привіт, {user.firstName}!
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#666', 
                          fontFamily: 'Rubik'
                        }}
                      >
                        {user.role === 'student' ? 'Студент' : 'Роботодавець'}
                      </Typography>
                    </Box>
                    
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      sx={{ 
                        color: '#1c2526',
                        '&:hover': {
                          backgroundColor: 'rgba(28, 37, 38, 0.04)'
                        }
                      }}
                    >
                      <Avatar sx={{ width: 36, height: 36 }}>
                        <PersonIcon />
                      </Avatar>
                    </IconButton>
                    
                    <Menu
                      anchorEl={profileMenuAnchor}
                      open={Boolean(profileMenuAnchor)}
                      onClose={handleProfileMenuClose}
                      sx={{
                        '& .MuiPaper-root': {
                          mt: 1,
                          minWidth: 180
                        }
                      }}
                    >
                      <MenuItem 
                        onClick={() => {
                          handleNavigation('/student-profile');
                          handleProfileMenuClose();
                        }}
                        sx={{ fontFamily: 'Rubik' }}
                      >
                        Мій профіль
                      </MenuItem>
                      
                      {isStudent && (
                        <MenuItem 
                          onClick={() => {
                            handleNavigation('/my-applications');
                            handleProfileMenuClose();
                          }}
                          sx={{ fontFamily: 'Rubik' }}
                        >
                          Мої відгуки
                        </MenuItem>
                      )}
                      
                      {isEmployer && (
                        <MenuItem 
                          onClick={() => {
                            handleNavigation('/employer-dashboard');
                            handleProfileMenuClose();
                          }}
                          sx={{ fontFamily: 'Rubik' }}
                        >
                          Дашборд
                        </MenuItem>
                      )}
                      
                      <Divider />
                      <MenuItem 
                        onClick={handleLogout}
                        sx={{ fontFamily: 'Rubik', color: '#f44336' }}
                      >
                        Вийти
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={handleMobileMenuToggle}
              sx={{ 
                color: '#1c2526',
                '&:hover': {
                  backgroundColor: 'rgba(28, 37, 38, 0.04)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      {isMobile && <MobileMenu />}
    </>
  );
};

export default Navbar;