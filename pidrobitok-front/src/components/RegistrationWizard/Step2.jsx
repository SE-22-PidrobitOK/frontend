import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Step2 = ({ formik, onNext, onBack }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('cv', file);
    }
  };

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

        <Box>
          <TextField
            label="LinkedIn profile"
            name="linkedinProfile"
            value={formik.values.linkedinProfile}
            onChange={formik.handleChange}
            error={formik.touched.linkedinProfile && Boolean(formik.errors.linkedinProfile)}
            helperText={
              (formik.touched.linkedinProfile && formik.errors.linkedinProfile) ||
              'Link to your LinkedIn profile. Please check that the link is working.'
            }
            fullWidth
            color="secondary"
          />
          
        </Box>

        <Box>
          <Typography variant="body1" sx={{ color: 'secondary.main', mb: 1 }}>CV</Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
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
            Choose File
            <input
              type="file"
              hidden
              accept=".pdf"
              onChange={handleFileChange}
            />
          </Button>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#6F6F6F' }}>
            We accepts CVs in PDF format only and up to 10MB in size.
          </Typography>
        </Box>

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