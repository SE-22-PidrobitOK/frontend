import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Slider,
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import {
  FilterList,
  ExpandMore,
  Clear,
  Search,
  CalendarToday,
  PriorityHigh,
  Business,
  Person,
  Flag
} from '@mui/icons-material';

const ModerationFilters = ({ onFilterChange, activeFilters, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: 'all',
      priority: 'all',
      targetType: 'all',
      dateRange: 'all',
      moderator: 'all',
      flaggedWords: false,
      hasComplaints: false,
      salaryRange: [0, 10000],
      experienceLevel: 'all',
      location: '',
      company: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(localFilters).forEach(([key, value]) => {
      if (key === 'salaryRange') {
        if (value[0] !== 0 || value[1] !== 10000) count++;
      } else if (typeof value === 'boolean') {
        if (value) count++;
      } else if (typeof value === 'string') {
        if (value !== 'all' && value !== '') count++;
      }
    });
    return count;
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
          Розширені фільтри
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {getActiveFilterCount() > 0 && (
            <Chip
              label={`${getActiveFilterCount()} активних`}
              size="small"
              color="primary"
            />
          )}
          <Button
            size="small"
            startIcon={<Clear />}
            onClick={handleClearFilters}
            sx={{ color: '#666' }}
          >
            Очистити
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Basic Filters */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontFamily="Rubik" fontWeight={500}>
              Основні фільтри
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Статус</InputLabel>
                  <Select
                    value={localFilters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    label="Статус"
                  >
                    <MenuItem value="all">Всі статуси</MenuItem>
                    <MenuItem value="pending">На розгляді</MenuItem>
                    <MenuItem value="approved">Схвалені</MenuItem>
                    <MenuItem value="rejected">Відхилені</MenuItem>
                    <MenuItem value="investigating">Розслідується</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Пріоритет</InputLabel>
                  <Select
                    value={localFilters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    label="Пріоритет"
                  >
                    <MenuItem value="all">Всі пріоритети</MenuItem>
                    <MenuItem value="high">Високий</MenuItem>
                    <MenuItem value="medium">Середній</MenuItem>
                    <MenuItem value="low">Низький</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Тип об'єкта</InputLabel>
                  <Select
                    value={localFilters.targetType}
                    onChange={(e) => handleFilterChange('targetType', e.target.value)}
                    label="Тип об'єкта"
                  >
                    <MenuItem value="all">Всі типи</MenuItem>
                    <MenuItem value="vacancy">Вакансії</MenuItem>
                    <MenuItem value="user">Користувачі</MenuItem>
                    <MenuItem value="complaint">Скарги</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Період</InputLabel>
                  <Select
                    value={localFilters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    label="Період"
                  >
                    <MenuItem value="all">Весь час</MenuItem>
                    <MenuItem value="today">Сьогодні</MenuItem>
                    <MenuItem value="week">Тиждень</MenuItem>
                    <MenuItem value="month">Місяць</MenuItem>
                    <MenuItem value="quarter">Квартал</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Vacancy Specific Filters */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontFamily="Rubik" fontWeight={500}>
              Фільтри вакансій
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Компанія"
                  value={localFilters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  placeholder="Назва компанії"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Місце роботи"
                  value={localFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Місто або регіон"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Діапазон зарплати (USD)
                </Typography>
                <Slider
                  value={localFilters.salaryRange}
                  onChange={(e, newValue) => handleFilterChange('salaryRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000}
                  step={100}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5000, label: '5000' },
                    { value: 10000, label: '10000+' }
                  ]}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption">
                    ${localFilters.salaryRange[0]}
                  </Typography>
                  <Typography variant="caption">
                    ${localFilters.salaryRange[1]}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Рівень досвіду</InputLabel>
                  <Select
                    value={localFilters.experienceLevel}
                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                    label="Рівень досвіду"
                  >
                    <MenuItem value="all">Будь-який досвід</MenuItem>
                    <MenuItem value="entry">Початковий (0-1 рік)</MenuItem>
                    <MenuItem value="junior">Молодший (1-3 роки)</MenuItem>
                    <MenuItem value="middle">Середній (3-5 років)</MenuItem>
                    <MenuItem value="senior">Старший (5+ років)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* User Specific Filters */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontFamily="Rubik" fontWeight={500}>
              Фільтри користувачів
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Роль користувача</InputLabel>
                  <Select
                    value={localFilters.userRole}
                    onChange={(e) => handleFilterChange('userRole', e.target.value)}
                    label="Роль користувача"
                  >
                    <MenuItem value="all">Всі ролі</MenuItem>
                    <MenuItem value="student">Студент</MenuItem>
                    <MenuItem value="employer">Роботодавець</MenuItem>
                    <MenuItem value="admin">Адміністратор</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Статус акаунту</InputLabel>
                  <Select
                    value={localFilters.accountStatus}
                    onChange={(e) => handleFilterChange('accountStatus', e.target.value)}
                    label="Статус акаунту"
                  >
                    <MenuItem value="all">Всі статуси</MenuItem>
                    <MenuItem value="active">Активний</MenuItem>
                    <MenuItem value="warning">Попередження</MenuItem>
                    <MenuItem value="blocked">Заблокований</MenuItem>
                    <MenuItem value="suspended">Призупинений</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Кількість порушень
                </Typography>
                <Slider
                  value={localFilters.violationsRange}
                  onChange={(e, newValue) => handleFilterChange('violationsRange', newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10}
                  step={1}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 5, label: '5' },
                    { value: 10, label: '10+' }
                  ]}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Advanced Filters */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontFamily="Rubik" fontWeight={500}>
              Розширені фільтри
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localFilters.flaggedWords}
                      onChange={(e) => handleFilterChange('flaggedWords', e.target.checked)}
                    />
                  }
                  label="З підозрілими словами"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localFilters.hasComplaints}
                      onChange={(e) => handleFilterChange('hasComplaints', e.target.checked)}
                    />
                  }
                  label="З активними скаргами"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localFilters.urgent}
                      onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                    />
                  }
                  label="Термінові"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localFilters.remote}
                      onChange={(e) => handleFilterChange('remote', e.target.checked)}
                    />
                  }
                  label="Віддалена робота"
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleApplyFilters}
            sx={{
              backgroundColor: '#1c2526',
              fontFamily: 'Rubik',
              '&:hover': {
                backgroundColor: '#2c3537'
              }
            }}
          >
            Застосувати фільтри
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ModerationFilters; 