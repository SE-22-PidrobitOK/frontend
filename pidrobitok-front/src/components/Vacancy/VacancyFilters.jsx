import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Switch,
  Divider,
  Button
} from '@mui/material';
import { ExpandMore, Clear } from '@mui/icons-material';
import PropTypes from 'prop-types';

const VacancyFilters = ({ onFilterChange, activeFilters, mobile = false }) => {
  const locations = [
    'Київ',
    'Львів', 
    'Харків',
    'Балаклія',
    'Одеса',
    'Запоріжжя',
    'Вінниця',
    'Івано-Франківськ'
  ];

  const experienceLevels = [
    '0',
    '1',
    '2', 
    '3',
    '5',
    '7'
  ];

  const salaryRanges = [
    'До $1000',
    '$1000-2000',
    '$2000-3000',
    '$3000-4000',
    '$4000-5000',
    '$5000+'
  ];

  const popularTags = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Java',
    'TypeScript',
    'Angular',
    'Vue.js',
    'PHP',
    'C#',
    'Django',
    'Next.js',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'React Native',
    'iOS',
    'Android'
  ];

  const handleLocationChange = (location) => {
    const newLocations = activeFilters.location.includes(location)
      ? activeFilters.location.filter(l => l !== location)
      : [...activeFilters.location, location];
    
    onFilterChange({
      ...activeFilters,
      location: newLocations
    });
  };

  const handleExperienceChange = (experience) => {
    const newExperience = activeFilters.experience.includes(experience)
      ? activeFilters.experience.filter(e => e !== experience)
      : [...activeFilters.experience, experience];
    
    onFilterChange({
      ...activeFilters,
      experience: newExperience
    });
  };

  const handleSalaryChange = (salary) => {
    const newSalary = activeFilters.salary.includes(salary)
      ? activeFilters.salary.filter(s => s !== salary)
      : [...activeFilters.salary, salary];
    
    onFilterChange({
      ...activeFilters,
      salary: newSalary
    });
  };

  const handleTagChange = (tag) => {
    const newTags = activeFilters.tags.includes(tag)
      ? activeFilters.tags.filter(t => t !== tag)
      : [...activeFilters.tags, tag];
    
    onFilterChange({
      ...activeFilters,
      tags: newTags
    });
  };

  const handleRemoteChange = (event) => {
    onFilterChange({
      ...activeFilters,
      remote: event.target.checked
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      location: [],
      experience: [],
      salary: [],
      tags: [],
      remote: false
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      }
      return count + (filter ? 1 : 0);
    }, 0);
  };

  const FilterSection = ({ title, children, defaultExpanded = true }) => {
    if (mobile) {
      return (
        <Accordion defaultExpanded={defaultExpanded} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1" fontFamily="Rubik" fontWeight={600}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            {children}
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="subtitle1" 
          fontFamily="Rubik" 
          fontWeight={600}
          sx={{ mb: 2, color: '#1c2526' }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    );
  };

  return (
    <Box sx={{
      backgroundColor: 'white',
      borderRadius: mobile ? 0 : 2,
      p: mobile ? 0 : 3,
      boxShadow: mobile ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
      border: mobile ? 'none' : '1px solid #f0f0f0',
      position: 'sticky',
      top: mobile ? 0 : 24,
      maxHeight: mobile ? 'none' : 'calc(100vh - 48px)',
      overflowY: mobile ? 'visible' : 'auto'
    }}>
      {/* Header */}
      {!mobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontFamily="Rubik" fontWeight={600} color="#1c2526">
            Фільтри
          </Typography>
          {getActiveFilterCount() > 0 && (
            <Button
              size="small"
              startIcon={<Clear />}
              onClick={clearAllFilters}
              sx={{ 
                color: '#666',
                fontSize: '0.8rem',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Очистити
            </Button>
          )}
        </Box>
      )}

      {/* Remote Work Toggle */}
      <FilterSection title="Тип роботи">
        <FormControlLabel
          control={
            <Switch
              checked={activeFilters.remote}
              onChange={handleRemoteChange}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#1c2526',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#1c2526',
                },
              }}
            />
          }
          label={
            <Typography variant="body2" fontFamily="Rubik">
              Тільки віддалена робота
            </Typography>
          }
        />
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      {/* Location Filter */}
      <FilterSection title="Місто">
        <FormGroup>
            
          {locations.map((location) => (
            <FormControlLabel
              color='#12539f'
              key={location}
              control={
                <Checkbox
                  checked={activeFilters.location.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  size="small"
                  sx={{
                    color: '#666',
                    '&.Mui-checked': {
                      color: '#1c2526',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" fontFamily="Rubik">
                  {location}
                </Typography>
              }
              sx={{ height: 32 }}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      {/* Experience Filter */}
      <FilterSection title="Досвід роботи">
        <FormGroup>
          {experienceLevels.map((experience) => (
            <FormControlLabel
              key={experience}
              control={
                <Checkbox
                  checked={activeFilters.experience.includes(experience)}
                  onChange={() => handleExperienceChange(experience)}
                  size="small"
                  sx={{
                    color: '#666',
                    '&.Mui-checked': {
                      color: '#1c2526',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" fontFamily="Rubik">
                  {+experience !== 0 ? `${experience}+ років` : 'без досвіду'}
                </Typography>
              }
              sx={{ height: 32 }}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      {/* Salary Filter */}
      <FilterSection title="Зарплата">
        <FormGroup>
          {salaryRanges.map((salary) => (
            <FormControlLabel
              key={salary}
              control={
                <Checkbox
                  checked={activeFilters.salary.includes(salary)}
                  onChange={() => handleSalaryChange(salary)}
                  size="small"
                  sx={{
                    color: '#666',
                    '&.Mui-checked': {
                      color: '#1c2526',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" fontFamily="Rubik">
                  {salary}
                </Typography>
              }
              sx={{ height: 32 }}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      {/* Technology Tags Filter */}
      <FilterSection title="Технології" defaultExpanded={false}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {popularTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              clickable
              onClick={() => handleTagChange(tag)}
              variant={activeFilters.tags.includes(tag) ? 'filled' : 'outlined'}
              sx={{
                borderColor: activeFilters.tags.includes(tag) ? '#1c2526' : '#e0e0e0',
                backgroundColor: activeFilters.tags.includes(tag) ? '#1c2526' : 'transparent',
                color: activeFilters.tags.includes(tag) ? 'white' : '#666',
                fontSize: '0.75rem',
                height: 28,
                fontFamily: 'Rubik',
                '&:hover': {
                  backgroundColor: activeFilters.tags.includes(tag) ? '#2c3537' : '#f5f5f5',
                  borderColor: activeFilters.tags.includes(tag) ? '#2c3537' : '#ccc'
                }
              }}
            />
          ))}
        </Box>
      </FilterSection>

      {/* Active Filters Summary - Desktop Only */}
      {!mobile && getActiveFilterCount() > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography 
              variant="subtitle2" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ mb: 1, color: '#1c2526' }}
            >
              Активні фільтри ({getActiveFilterCount()})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {activeFilters.location.map(location => (
                <Chip
                  key={`loc-${location}`}
                  label={location}
                  size="small"
                  onDelete={() => handleLocationChange(location)}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {activeFilters.experience.map(exp => (
                <Chip
                  key={`expr-${exp}`}
                  label={exp}
                  size="small"
                  onDelete={() => handleExperienceChange(exp)}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {activeFilters.salary.map(sal => (
                <Chip
                  key={`sal-${sal}`}
                  label={sal}
                  size="small"
                  onDelete={() => handleSalaryChange(sal)}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {activeFilters.tags.map(tag => (
                <Chip
                  key={`tag-${tag}`}
                  label={tag}
                  size="small"
                  onDelete={() => handleTagChange(tag)}
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
              {activeFilters.remote && (
                <Chip
                  label="Remote"
                  size="small"
                  onDelete={handleRemoteChange}
                  sx={{ fontSize: '0.7rem' }}
                />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

VacancyFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  activeFilters: PropTypes.shape({
    location: PropTypes.arrayOf(PropTypes.string),
    experience: PropTypes.arrayOf(PropTypes.string),
    salary: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    remote: PropTypes.bool
  }).isRequired,
  mobile: PropTypes.bool
};

export default VacancyFilters;