import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Показуємо лоадер поки перевіряємо автентифікацію
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Якщо користувач не автентифікований, перенаправляємо на сторінку входу
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Якщо вказані дозволені ролі і поточна роль користувача не входить до них
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Перенаправляємо на дефолтну сторінку залежно від ролі
    const defaultRoute = user.role === 'employer' ? '/employer-dashboard' : '/vacancies';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
};

export default ProtectedRoute;