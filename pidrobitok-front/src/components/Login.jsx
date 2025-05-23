import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const validationSchema = object({
  email: string().email('Invalid email format').required('Required field'),
  password: string().min(8, 'Password must be at least 8 characters').required('Required field'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
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
        maxWidth: '400px',
        margin: '0 auto',
        padding: '24px',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1A1919' }}>
        Log in
      </Typography>

      <Box sx={{ width: '100%', mb: 3 }}>
        <TextField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          fullWidth
          color="info"
          sx={{ mb: 2 }}
        />
        <PasswordField
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
          fullWidth
          color="info"
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={formik.handleSubmit}
        sx={{
          py: 1.5,
          textTransform: 'none',
          borderRadius: 1,
          mb: 2,
          backgroundColor: 'info.main',
          '&:hover': {
            backgroundColor: '#1664b4'
          }
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
          Log In
        </Typography>
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: '#E6E6E6' }} />
        <Typography variant="body2" sx={{ mx: 2, color: '#6F6F6F' }}>
          or login with
        </Typography>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: '#E6E6E6' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            py: 1.5,
            textTransform: 'none',
            borderRadius: 1,
            borderColor: '#E6E6E6',
            color: '#1A1919',
            backgroundColor: '#fff',
            '&:hover': {
              borderColor: '#0B3BE8',
              backgroundColor: '#fff'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinkedInIcon sx={{ fontSize: 20 }} />
            Login with LinkedIn
          </Box>
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            py: 1.5,
            textTransform: 'none',
            borderRadius: 1,
            borderColor: '#E6E6E6',
            color: '#1A1919',
            backgroundColor: '#fff',
            '&:hover': {
              borderColor: '#0B3BE8',
              backgroundColor: '#fff'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GoogleIcon sx={{ fontSize: 20 }} />
            Login with Google
          </Box>
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            py: 1.5,
            textTransform: 'none',
            borderRadius: 1,
            borderColor: '#E6E6E6',
            color: '#1A1919',
            backgroundColor: '#fff',
            '&:hover': {
              borderColor: '#0B3BE8',
              backgroundColor: '#fff'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GitHubIcon sx={{ fontSize: 20 }} />
            Login with GitHub
          </Box>
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#0B3BE8',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Sign Up
        </Typography>
        <Typography variant="body2" sx={{ color: '#6F6F6F' }}>•</Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#0B3BE8',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Forgot password?
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
