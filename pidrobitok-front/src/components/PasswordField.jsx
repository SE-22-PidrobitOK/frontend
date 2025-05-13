import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';

const PasswordField = ({
  label = 'Password',
  value,
  onChange,
  variant = 'outlined',
  fullWidth = true,
  size = 'medium',
  error = false,
  unfocusedColor = 'rgba(255, 255, 255, 1)',
  iconColor = 'primary',
  helperText = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
          sx={{

         '& .MuiInputLabel-root':props=>( { top: size =='small'?'2px':'-5px',}),
          
        '& .MuiOutlinedInput-root': {
          '& input': {
            color: unfocusedColor, // Колір тексту
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: unfocusedColor, // Білий бордер при наведенні
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: unfocusedColor, // Білий бордер у розфокусі
        },
        '& .MuiInputLabel-outlined': {
          color: unfocusedColor, // Білий лейбл у розфокусі
        },
        '& .MuiInputBase-root': { height: '45px' },
      }}
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
            color={iconColor}
              onClick={handleTogglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()} // To prevent focus loss
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}

      {...props}
    />
  );
};

PasswordField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  unfocusedColor: PropTypes.string,
  iconColor: PropTypes.string,
};

export default PasswordField;