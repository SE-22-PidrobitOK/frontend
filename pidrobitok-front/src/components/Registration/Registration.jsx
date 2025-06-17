import React, { useState } from 'react';
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
  userName: yup.string()
    .required("Ім'я користувача обов'язкове")
    .min(3, "Ім'я користувача повинно містити мінімум 3 символи")
    .max(20, "Ім'я користувача не повинно перевищувати 20 символів")
    .matches(/^[a-zA-Z0-9_]+$/, "Ім'я користувача може містити лише літери, цифри та підкреслення"),
  email: yup.string()
    .required('Email є обов\'язковим')
    .email('Введіть дійсний email'),
  firstName: yup.string()
    .required("Ім'я є обов'язковим")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів"),
  lastName: yup.string()
    .required('Прізвище є обов\'язковим')
    .min(2, 'Прізвище повинно містити мінімум 2 символи')
    .max(50, 'Прізвище не повинно перевищувати 50 символів'),
  role: yup.string()
    .required('Виберіть роль')
    .oneOf(['employer', 'student'], 'Виберіть коректну роль'),
});

const Registration = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, user } = useAuth();
  const [error, setError] = useState('');

  // Якщо користувач вже автентифікований, перенаправляємо його
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'employer' ? '/employer-dashboard' : '/vacancies';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      role: '',
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError('');
        const result = await register(values);
        
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
            label="Ім'я користувача"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            placeholder="Введіть ім'я користувача"
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
            label="Ім'я"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            placeholder="Введіть ваше прізвище"
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
                }
              }}
            >
              Виберіть роль
            </FormLabel>
            <RadioGroup
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
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
            disabled={!formik.isValid || formik.isSubmitting}
            sx={{
              py: 1.5,
              mt: 2,
              textTransform: 'none',
              borderRadius: 1,
              borderColor: '#1c2526',
              color: '#1c2526',
              position: 'relative',
              '&:disabled': {
                borderColor: '#1c2526',
                color: '#1c2526',
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