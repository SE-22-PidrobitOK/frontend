import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useFormik } from 'formik';
import { string, object } from 'yup';

const validationSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
});

const Login = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
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
        Увійти на сайт
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
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
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
          Увійти
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
export default Login;
