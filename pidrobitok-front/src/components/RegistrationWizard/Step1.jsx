import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@mui/material';

const employmentOptions = [
  { value: 'office', label: 'Office' },
  { value: 'remote', label: 'Remote work' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'freelance', label: 'Freelance (one-time projects)' },
];

const englishLevels = [
  { value: 'no-english', label: 'No English' },
  { value: 'beginner', label: 'Beginner/Elementary' },
  { value: 'pre-intermediate', label: 'Pre-Intermediate' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'upper-intermediate', label: 'Upper-Intermediate' },
  { value: 'advanced', label: 'Advanced/Fluent' },
];

const Step1 = ({ formik, onNext }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#1A1919' }}>
        Create new profile
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#6F6F6F' }}>
        Tell us about your experience and requirements without disclosing your contact or
        private data for your anonymous public profile.
      </Typography>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Position"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
          placeholder="For example, PHP developer"
          fullWidth
          color="info"
        />

        <TextField
          select
          label="Category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
          fullWidth
          color="info"
        >
          <MenuItem value="">- Choose an option -</MenuItem>
          <MenuItem value="frontend">Frontend Development</MenuItem>
          <MenuItem value="backend">Backend Development</MenuItem>
          <MenuItem value="fullstack">Full Stack Development</MenuItem>
          <MenuItem value="mobile">Mobile Development</MenuItem>
          <MenuItem value="design">UI/UX Design</MenuItem>
        </TextField>

        <TextField
          label="Work experience in years"
          name="workExperience"
          type="number"
          value={formik.values.workExperience}
          onChange={formik.handleChange}
          error={formik.touched.workExperience && Boolean(formik.errors.workExperience)}
          helperText={formik.touched.workExperience && formik.errors.workExperience}
          placeholder="For example, 0,5"
          fullWidth
          color="info"
        />

        <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
        <Typography variant="body2" sx={{ mt: 1 }}>$</Typography>
          <TextField
            label="Salary expectations"
            name="salaryExpectations"
            type="number"
            value={formik.values.salaryExpectations}
            onChange={formik.handleChange}
            error={formik.touched.salaryExpectations && Boolean(formik.errors.salaryExpectations)}
            helperText={formik.touched.salaryExpectations && formik.errors.salaryExpectations}
            placeholder="1500"
            fullWidth
            color="info"
          />
        </Box>

        <TextField
          label="Experience summary"
          name="experienceSummary"
          multiline
          rows={4}
          value={formik.values.experienceSummary}
          onChange={formik.handleChange}
          error={formik.touched.experienceSummary && Boolean(formik.errors.experienceSummary)}
          helperText={
            (formik.touched.experienceSummary && formik.errors.experienceSummary) ||
            'Describe what projects and tasks you have completed, what technologies you have used, your current role in the team, and what you want to improve'
          }
          fullWidth
          color="info"
        />

        <TextField
          label="Skills"
          name="skills"
          value={formik.values.skills}
          onChange={formik.handleChange}
          error={formik.touched.skills && Boolean(formik.errors.skills)}
          helperText={
            (formik.touched.skills && formik.errors.skills) ||
            'Additional keywords that are used to help recruiters find you in candidates search. Comma-separated tags.'
          }
          fullWidth
          color="info"
        />

        <FormControl error={formik.touched.employmentOptions && Boolean(formik.errors.employmentOptions)}>
          <Typography variant="body1" color="secondary" sx={{ mb: 1 }}>Employment options</Typography>
          {employmentOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={formik.values.employmentOptions.includes(option.value)}
                  onChange={(e) => {
                    const newOptions = e.target.checked
                      ? [...formik.values.employmentOptions, option.value]
                      : formik.values.employmentOptions.filter((v) => v !== option.value);
                    formik.setFieldValue('employmentOptions', newOptions);
                  }}
                  color="info"
                />
              }
              label={option.label}
              sx={{ color: 'secondary.main' }}
            />
          ))}
          {formik.touched.employmentOptions && formik.errors.employmentOptions && (
            <FormHelperText>{formik.errors.employmentOptions}</FormHelperText>
          )}
        </FormControl>

        <TextField
          select
          label="English level"
          name="englishLevel"
          value={formik.values.englishLevel}
          onChange={formik.handleChange}
          error={formik.touched.englishLevel && Boolean(formik.errors.englishLevel)}
          helperText={formik.touched.englishLevel && formik.errors.englishLevel}
          fullWidth
          color="info"
        >
          {englishLevels.map((level) => (
            <MenuItem key={level.value} value={level.value}>
              {level.label}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.speakUkrainian}
              onChange={(e) => formik.setFieldValue('speakUkrainian', e.target.checked)}
              color="secondary"
            />
          }
          label="Speak Ukrainian"
          sx={{ color: 'secondary.main' }}
        />

        <Button
          variant="contained"
          onClick={formik.handleSubmit}
          sx={{
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
  );
};

export default Step1; 