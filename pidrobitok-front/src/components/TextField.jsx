import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  value,
  onChange,
  type = 'text',
  variant = 'outlined',
  fullWidth = true,
  size = 'medium',
  error = false,
  helperText = '',
  ...props
}) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      variant={variant} // 'outlined', 'filled', 'standard'
      fullWidth={fullWidth}
      size={size} // 'small', 'medium'
      error={error}
      helperText={helperText}
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
};

export default TextField;