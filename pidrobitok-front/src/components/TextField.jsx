import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  value = '',
  color = 'primary',
  onChange,
  type = 'text',
  variant = 'outlined',
  fullWidth = true,
  size = 'medium',
  error = false,
  helperText = '',
  unfocusedColor = 'rgba(255, 255, 255, 1)', // Білий колір за замовчуванням
  ...props
}) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      color={color}
      onChange={onChange}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      error={error}
      helperText={helperText}
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
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme => theme.palette[color].info, // Колір лейбла при фокусі
        },
        '&:hover .MuiOutlinedInput-notchedOutline.Mui-focused': {
            color: theme => theme.palette[color].info, // Білий бордер при наведенні
          },
        '& .MuiInputBase-root': { height: '45px' },
      }}
      {...props}
    />
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  unfocusedColor: PropTypes.string,
};

export default TextField;