import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';

const Step2 = ({ formik, onNext, onBack }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#1A1919' }}>
        Share your contact info
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#6F6F6F' }}>
        Your profile remains anonymous. Only you decide when and with whom to share your
        contacts.
      </Typography>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Your name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          color="info"
          required
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              flex: 1,
              py: 1.5,
              textTransform: 'none',
              borderRadius: 1,
              borderColor: '#E6E6E6',
              color: '#1A1919',
              '&:hover': {
                borderColor: '#0B3BE8',
                backgroundColor: '#fff'
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Back
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            sx={{
              flex: 1,
              py: 1.5,
              textTransform: 'none',
              borderRadius: 1,
              backgroundColor: 'info.main',
              '&:hover': {
                backgroundColor: '#1664b4'
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
              Continue
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Step2; 