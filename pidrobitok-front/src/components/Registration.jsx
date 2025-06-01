import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required field'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Required field'),
});

const Register = () => {
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
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#1A1919' }}>
        Sign Up
      </Typography>
      <Box sx={{display:'flex'}}>
<Typography variant="body2" sx={{ mb: 3, color: '#1A1919' }}>or&nbsp;</Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 3,
          color: '#0B3BE8',
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
          log in to existing account
      </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, width: '100%', mb: 3 }}>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            py: 2,
            borderRadius: 1,
            textTransform: 'none',
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
            <LaptopMacIcon sx={{ fontSize: 24 }} />
            I'm looking for a job
          </Box>
        </Button>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            py: 2,
            borderRadius: 1,
            textTransform: 'none',
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
            <ApartmentIcon sx={{ fontSize: 24 }} />
            I'm hiring
          </Box>
        </Button>
      </Box>

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
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
        Continue
      </Typography>
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: '#E6E6E6' }} />
        <Typography variant="body2" sx={{ mx: 2, color: '#6F6F6F' }}>
          or sign up with
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
            Sign up with LinkedIn
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
            Sign up with Google
          </Box>
        </Button>
      </Box>

      <Typography variant="caption" sx={{ mt: 2, color: '#6F6F6F', textAlign: 'center' }}>
        By signing up, you agree with <Typography component="span" variant="caption" sx={{ color: '#0B3BE8', cursor: 'pointer' }}>Terms of Service</Typography> & <Typography component="span" variant="caption" sx={{ color: '#0B3BE8', cursor: 'pointer' }}>Privacy</Typography>
      </Typography>
    </Box>
  );
};

export default Register;