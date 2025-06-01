import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from '@mui/material';
import TextField from './TextField';
import PasswordField from './PasswordField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RegisterModelDto } from '../dtoModels/RegisterModelDto';

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Обов'язкове поле")
    .min(2, "Ім'я має бути щонайменше 2 символи"),
  surname: yup
    .string()
    .required("Обов'язкове поле")
    .min(2, 'Прізвище має бути щонайменше 2 символи'),
  email: yup
    .string()
    .email('Невірний формат email')
    .required("Обов'язкове поле"),
  password: yup
    .string()
    .min(8, 'Пароль має бути щонайменше 8 символів')
    .required("Обов'язкове поле"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Паролі мають збігатися')
    .required("Обов'язкове поле"),
  role: yup
    .string()
    .oneOf(['student', 'employer'], 'Оберіть роль')
    .required('Оберіть роль'),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    },
    onSubmit: async (values) => {
      const registrationModel = new RegisterModelDto({
        firstName: values.name,
        lastName: values.surname,
        email: values.email,
        password: values.password,
        isStudent: values.role === 'student',
      });

      console.log(registrationModel);
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
          fullWidth
          size="large"
        />
        <TextField
          label="Прізвище"
          value={formik.values.surname}
          onChange={formik.handleChange('surname')}
          error={!!formik.errors.surname}
          helperText={formik.errors.surname}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth
          size="large"
        />
        <TextField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth
          size="large"
        />
        <PasswordField
          label="Пароль"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth
          size="large"
        />
        <PasswordField
          label="Підтвердіть пароль"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange('confirmPassword')}
          error={!!formik.errors.confirmPassword}
          helperText={formik.errors.confirmPassword}
          unfocusedColor="rgba(255, 255, 255, 1)"
          fullWidth
          size="large"
        />

        <FormControl
          component="fieldset"
          error={!!formik.errors.role}
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 500 }}>
              Я реєструюсь як
            </Typography>
            <FormControlLabel
              value="student"
              control={
                <Radio
                  checked={formik.values.role === 'student'}
                  onChange={formik.handleChange('role')}
                  sx={{ color: 'white' }}
                />
              }
              label="Студент"
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              value="employer"
              control={
                <Radio
                  checked={formik.values.role === 'employer'}
                  onChange={formik.handleChange('role')}
                  sx={{ color: 'white' }}
                />
              }
              label="Роботодавець"
              sx={{ color: 'white' }}
            />
          </Box>

          {formik.errors.role && (
            <Typography sx={{ fontSize: '12px', color: '#f44336', mt: '5px' }}>
              {formik.errors.role}
            </Typography>
          )}
        </FormControl>
      </Box>

      <Button
        onClick={formik.handleSubmit}
        size="large"
        color="error"
        fullWidth
        variant="contained"
        sx={{ marginY: '20px' }}
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
