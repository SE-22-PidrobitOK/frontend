import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
} from '@mui/material';

const Step3 = ({ formik, onBack, onSubmit }) => {
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#1A1919' }}>
        Let's confirm your Data
      </Typography>

      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #E6E6E6' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#1A1919', mb: 1 }}>
              {formik.values.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#1A1919', mb: 1 }}>
              Category: {formik.values.category}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6F6F6F' }}>
              {formik.values.position}
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: 'info.main', fontWeight: 600 }}>
            {formatSalary(formik.values.salaryExpectations)} / mo
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          {formik.values.experienceSummary}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#6F6F6F', mb: 1 }}>
            Employment options:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {formik.values.employmentOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                sx={{
                  backgroundColor: '#F5F5F5',
                  color: '#1A1919',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#6F6F6F', mb: 1 }}>
            Skills:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {formik.values.skills.split(',').map((skill) => (
              <Chip
                key={skill}
                label={skill.trim()}
                sx={{
                  backgroundColor: '#F5F5F5',
                  color: '#1A1919',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#6F6F6F', mb: 0.5 }}>
              Work experience
            </Typography>
            <Typography variant="body1" sx={{ color: '#1A1919' }}>
              {formik.values.workExperience} years
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#6F6F6F', mb: 0.5 }}>
              English
            </Typography>
            <Typography variant="body1" sx={{ color: '#1A1919' }}>
              {formik.values.englishLevel}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
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
          onClick={onSubmit}
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
            Create profile
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Step3; 