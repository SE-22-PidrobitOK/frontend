import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from './AuthContext';

const validationSchema = yup.object({
  firstName: yup.string()
    .required("Ім'я є обов'язковим")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .matches(/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ''\s]+$/, "Ім'я може містити тільки літери"),
  lastName: yup.string()
    .required('Прізвище є обов\'язковим')
    .min(2, 'Прізвище повинно містити мінімум 2 символи')
    .max(50, 'Прізвище не повинно перевищувати 50 символів')
    .matches(/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ''\s]+$/, 'Прізвище може містити тільки літери'),
  email: yup.string()
    .required('Email є обов\'язковим')
    .email('Введіть дійсний email'),
  password: yup.string()
    .required('Пароль є обов\'язковим')
    .min(6, 'Пароль повинен містити мінімум 6 символів')
    .max(100, 'Пароль не повинен перевищувати 100 символів'),
  confirmPassword: yup.string()
    .required('Підтвердження паролю є обов\'язковим')
    .oneOf([yup.ref('password'), null], 'Паролі повинні співпадати'),
  role: yup.string()
    .required('Виберіть роль')
    .oneOf(['employer', 'student'], 'Виберіть коректну роль'),
});

const Registration = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, user, loading: authLoading, error: authError, clearError } = useAuth();
  const [localError, setLocalError] = useState('');

  // Якщо користувач вже автентифікований, перенаправляємо його
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const redirectPath = user.role === 'employer' ? '/employer-dashboard' : '/vacancies';
      navigate(redirectPath, { replace: true });
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  // Очищуємо помилки при зміні полів
  useEffect(() => {
    if (authError || localError) {
      clearError();
      setLocalError('');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    },
    validationSchema: validationSchema,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Очищуємо попередні помилки
        setLocalError('');
        clearError();
        
        // Підготовлюємо дані для відправки на бекенд
        const userData = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
          role: values.role // student або employer
        };
        
        console.log('Attempting registration with:', { 
          ...userData, 
          password: '***' // Не логуємо пароль
        });
        
        const result = await register(userData);
        
        console.log('Registration result:', result);
        
        if (result.success) {
          console.log('Registration successful, user:', result.user);
          // Перенаправляємо залежно від ролі користувача
          const redirectPath = result.user.role === 'employer' 
            ? '/employer-dashboard' 
            : '/vacancies';
          navigate(redirectPath, { replace: true });
        } else {
          console.error('Registration failed:', result.error);
          setLocalError(result.error || 'Помилка реєстрації');
        }
      } catch (err) {
        console.error('Registration error:', err);
        setLocalError(err.message || 'Сталася помилка при реєстрації');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Показуємо лоадер під час ініціалізації аутентифікації
  if (authLoading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  const displayError = localError || authError;

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
          Реєстрація
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 4, 
            color: '#6F6F6F',
            textAlign: 'center'
          }}
        >
          Створіть свій акаунт, заповнивши форму нижче
        </Typography>

        {displayError && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => {
              setLocalError('');
              clearError();
            }}
          >
            {displayError}
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
            label="Ім'я"
            name="firstName"
            value={formik.values.firstName}
            onChange={(e) => {
              formik.handleChange(e);
              // Очищуємо помилки при зміні поля
              if (displayError) {
                setLocalError('');
                clearError();
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            placeholder="Введіть ваше ім'я"
            fullWidth
            color="info"
            required
            disabled={formik.isSubmitting}
          />

          <TextField
            label="Прізвище"
            name="lastName"
            value={formik.values.lastName}
            onChange={(e) => {
              formik.handleChange(e);
              // Очищуємо помилки при зміні поля
              if (displayError) {
                setLocalError('');
                clearError();
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            placeholder="Введіть ваше прізвище"
            fullWidth
            color="info"
            required
            disabled={formik.isSubmitting}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              // Очищуємо помилки при зміні поля
              if (displayError) {
                setLocalError('');
                clearError();
              }
            }}
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
            onChange={(e) => {
              formik.handleChange(e);
              // Очищуємо помилки при зміні поля
              if (displayError) {
                setLocalError('');
                clearError();
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            placeholder="Введіть пароль"
            fullWidth
            color="info"
            required
            disabled={formik.isSubmitting}
          />

          <TextField
            label="Підтвердити пароль"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={(e) => {
              formik.handleChange(e);
              // Очищуємо помилки при зміні поля
              if (displayError) {
                setLocalError('');
                clearError();
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            placeholder="Підтвердіть пароль"
            fullWidth
            color="info"
            required
            disabled={formik.isSubmitting}
          />

          <FormControl 
            component="fieldset" 
            error={formik.touched.role && Boolean(formik.errors.role)}
            required
            disabled={formik.isSubmitting}
          >
            <FormLabel 
              component="legend" 
              sx={{ 
                color: '#1A1919',
                fontWeight: 500,
                mb: 1,
                '&.Mui-focused': {
                  color: '#1976d2'
                },
                '&.Mui-error': {
                  color: '#d32f2f'
                }
              }}
            >
              Виберіть роль
            </FormLabel>
            <RadioGroup
              name="role"
              value={formik.values.role}
              onChange={(e) => {
                formik.handleChange(e);
                // Очищуємо помилки при зміні поля
                if (displayError) {
                  setLocalError('');
                  clearError();
                }
              }}
              onBlur={formik.handleBlur}
              sx={{ 
                flexDirection: 'row',
                gap: 2,
                pl: 1
              }}
            >
              <FormControlLabel
                value="student"
                control={<Radio color="info" />}
                label="Студент"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.95rem',
                    color: '#1A1919'
                  }
                }}
              />
              <FormControlLabel
                value="employer"
                control={<Radio color="info" />}
                label="Роботодавець"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.95rem',
                    color: '#1A1919'
                  }
                }}
              />
            </RadioGroup>
            {formik.touched.role && formik.errors.role && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#d32f2f',
                  fontSize: '0.75rem',
                  mt: 0.5,
                  ml: 2
                }}
              >
                {formik.errors.role}
              </Typography>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="outlined"
            disabled={formik.isSubmitting || (!formik.isValid && formik.submitCount > 0)}
            sx={{
              py: 1.5,
              mt: 2,
              textTransform: 'none',
              borderRadius: 1,
              borderColor: '#1c2526',
              color: '#1c2526',
              position: 'relative',
              '&:disabled': {
                borderColor: '#cccccc',
                color: '#cccccc',
                backgroundColor: 'transparent',
                cursor: 'not-allowed'
              },
              '&:hover': {
                backgroundColor: '#1c2526',
                color: 'white',
                borderColor: '#1c2526'
              }
            }}
          >
            {formik.isSubmitting ? (
              <CircularProgress size={24} sx={{ color: '#1c2526' }} />
            ) : (
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Зареєструватися
              </Typography>
            )}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#6F6F6F' }}>
              Вже маєте акаунт?{' '}
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
                onClick={() => navigate('/login')}
              >
                Увійти
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Registration;