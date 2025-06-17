import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from './AuthContext';

const validationSchema = yup.object({
  email: yup.string()
    .required('Email є обов\'язковим')
    .email('Введіть дійсний email'),
  password: yup.string()
    .required('Пароль є обов\'язковим')
    .min(6, 'Пароль повинен містити мінімум 6 символів'),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  // Якщо користувач вже автентифікований, перенаправляємо його
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'employer' ? '/employer-dashboard' : '/vacancies';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError('');
        const result = await login(values.email, values.password);
        
        if (result.success) {
          // Перенаправляємо залежно від ролі користувача
          const redirectPath = result.user.role === 'employer' 
            ? '/employer-dashboard' 
            : '/vacancies';
          navigate(redirectPath, { replace: true });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: '500px', 
          padding: 4,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 600, 
            color: '#1A1919',
            textAlign: 'center'
          }}
        >
          Вхід
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 4, 
            color: '#6F6F6F',
            textAlign: 'center'
          }}
        >
          Увійдіть до свого акаунту
        </Typography>

        {/* Демо-дані для тестування */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f0f8ff', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Демо-акаунти для тестування:
          </Typography>
          <Typography variant="caption" display="block">
            Студент: student@example.com / password123
          </Typography>
          <Typography variant="caption" display="block">
            Роботодавець: employer@example.com / password123
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={formik.handleSubmit}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3 
          }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder="Введіть ваш email"
            fullWidth
            color="info"
            required
            disabled={formik.isSubmitting}
          />

          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder="Введіть ваш пароль"
            fullWidth
            color="info"
            required
            disabled={formik.isSubmitting}
          />

          <Box sx={{ textAlign: 'right', mt: -1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'info.main', 
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#1664b4'
                }
              }}
              onClick={() => console.log('Redirect to forgot password')}
            >
              Забули пароль?
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="outlined"
            disabled={!formik.isValid || formik.isSubmitting}
            sx={{
              py: 1.5,
              mt: 2,
              textTransform: 'none',
              borderRadius: 1,
              borderColor: '#1c2526',
              color: '#1c2526',
              position: 'relative',
              '&:hover': {
                backgroundColor: '#1c2526',
                color: 'white',
                borderColor: '#1c2526'
              },
              '&:disabled': {
                borderColor: '#1c2526',
                color: '#1c2526',
                backgroundColor: 'transparent',
                cursor: 'not-allowed'
              }
            }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} sx={{ color: '#1c2526' }} />
            ) : (
              <Typography variant="h6" sx={{ fontWeight: 600}}>
                Увійти
              </Typography>
            )}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#6F6F6F' }}>
              Не маєте акаунту?{' '}
              <Typography 
                component="span" 
                sx={{ 
                  color: 'info.main', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#1664b4'
                  }
                }}
                onClick={() => navigate("/registration")}
              >
                Зареєструватися
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;