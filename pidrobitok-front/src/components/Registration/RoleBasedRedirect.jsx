import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Box, CircularProgress } from '@mui/material';

const RoleBasedRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

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
    return <Navigate to="/login" replace />;
  }

  // Перенаправляємо залежно від ролі користувача
  if (user.role === 'employer') {
    return <Navigate to="/employer-dashboard" replace />;
  } else if (user.role === 'student') {
    return <Navigate to="/vacancies" replace />;
  }

  // Якщо роль невідома, перенаправляємо на сторінку входу
  return <Navigate to="/login" replace />;
};

export default RoleBasedRedirect;