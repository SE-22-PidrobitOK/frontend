import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useFormik } from 'formik';
import * as yup from 'yup'; // Імпортуємо Yup як об'єкт

const validationSchema = yup.object({
  name: yup.string().required("Обов'язкове поле").min(2, "Ім'я має бути щонайменше 2 символи"),
  phone: yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Невірний формат номера телефону')
    .required("Обов'язкове поле").min(10, 'Номер телефону має бути щонайменше 10 цифр'),
  email: yup.string().email('Невірний формат email').required("Обов'язкове поле"),
  password: yup.string().min(8, 'Пароль має бути щонайменше 8 символів').required("Обов'язкове поле"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Паролі мають збігатися') // Виправлено синтаксис
    .required("Обов'язкове поле"),
});

const Register = () => {
  const formik = useFormik({
    initialValues: { name: '', phone: '', email: '', password: '', confirmPassword: '' },
    onSubmit: async (values) => {
      console.log(values);
    },
    validationSchema,
    validateOnChange: false,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minWidth: '300px',
        maxWidth: '500px',
        padding: '20px',
        backgroundColor: '#1c2526',
        color: 'white',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Typography
        fontFamily="Rubik"
        sx={{ fontSize: '24px', fontWeight: 500, mb: '20px' }}
      >
        Зареєструватися на сайті
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
        }}
      >
        <TextField
          label="Ім'я"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth={true}
          size="large"
        />
        <TextField
          label="Номер телефону"
          value={formik.values.phone}
          onChange={formik.handleChange('phone')}
          error={!!formik.errors.phone}
          helperText={formik.errors.phone}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth={true}
          size="large"
        />
        <TextField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth={true}
          size="large"
        />
        <PasswordField
          label="Пароль"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth={true}
          size="large"
        />
        <PasswordField
          label="Підтвердіть пароль"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange('confirmPassword')}
          error={!!formik.errors.confirmPassword}
          helperText={formik.errors.confirmPassword}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth={true}
          size="large"
        />
      </Box>
      <Button
        onClick={formik.handleSubmit}
        size="large"
        color="error"
        fullWidth={true}
        variant="contained"
        sx={{
          marginY: '20px',
        }}
      >
        <Typography color="primary" fontFamily="Rubik" fontWeight={600}>
          Зареєструватися
        </Typography>
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '',
          width: '100%',
          mb: '10px',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <Typography sx={{ margin: '0 10px', fontSize: '14px' }}>
          або за допомогою
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            textTransform: 'none',
            fontSize: '14px',
            padding: '10px 0',
            backgroundColor: '#3b5998',
            color: 'white',
          }}
          startIcon={
            <span style={{ fontSize: '20px', marginRight: '8px' }}>f</span>
          }
        >
          <Typography color="primary" fontFamily="Rubik" fontWeight={600}>
            Facebook
          </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            textTransform: 'none',
            fontSize: '14px',
            padding: '10px 0',
            backgroundColor: '#4285f4',
            color: 'white',
          }}
          startIcon={
            <span style={{ fontSize: '20px', marginRight: '8px' }}>G</span>
          }
        >
          <Typography color="primary" fontFamily="Rubik" fontWeight={600}>
            Google
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Register;