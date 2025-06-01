import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = ['Create new profile', 'Share your contact info', "Let's confirm your Data"];

const validationSchemas = {
  1: yup.object({
    position: yup.string().required('Position is required'),
    category: yup.string().required('Category is required'),
    workExperience: yup.number()
      .required('Work experience is required')
      .min(0, 'Work experience must be positive'),
    salaryExpectations: yup.number()
      .required('Salary expectations are required')
      .min(0, 'Salary must be positive'),
    experienceSummary: yup.string()
      .required('Experience summary is required')
      .min(50, 'Use at least 50 characters')
      .max(2500, 'Use at most 2500 characters'),
    skills: yup.string().required('Skills are required'),
    employmentOptions: yup.array()
      .min(1, 'Select at least one employment option'),
    englishLevel: yup.string().required('English level is required'),
  }),
  2: yup.object({
    name: yup.string().required('Name is required'),
    linkedinProfile: yup.string().url('Must be a valid URL'),
    cv: yup.mixed(),
  }),
};

const RegistrationWizard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      // Step 1
      position: '',
      category: '',
      workExperience: '',
      salaryExpectations: '',
      experienceSummary: '',
      skills: '',
      employmentOptions: [],
      englishLevel: '',
      speakUkrainian: false,
      
      // Step 2
      name: '',
      linkedinProfile: '',
      cv: null,
    },
    validationSchema: validationSchemas[activeStep + 1],
    onSubmit: (values) => {
      if (activeStep === steps.length - 1) {
        console.log('Final submission:', values);
      } else {
        handleNext();
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1
            formik={formik}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <Step2
            formik={formik}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3
            formik={formik}
            onBack={handleBack}
            onSubmit={formik.handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', p: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStepContent()}
    </Box>
  );
};

export default RegistrationWizard; 