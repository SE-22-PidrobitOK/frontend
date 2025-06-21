import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
  Divider,
  Alert,
  Autocomplete,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  useTheme,
  useMediaQuery,
  Skeleton,
  CircularProgress
} from '@mui/material';
import {
  Work,
  LocationOn,
  AttachMoney,
  Schedule,
  Add,
  Delete,
  Info,
  Preview,
  Publish,
  Business,
  Email,
  Phone,
  Language,
  FileUpload,
  Edit,
  ArrowBack,
  Save
} from '@mui/icons-material';

const AddVacancyPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  
  // Определяем режим работы компонента
  const isEditMode = Boolean(id) || location.pathname.includes('edit');
  const vacancyId = id || location.state?.vacancyId;
  
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: {
      from: '',
      to: '',
      currency: 'USD',
      period: 'month'
    },
    experience: '',
    employmentType: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    tags: [],
    isRemote: false,
    contactEmail: '',
    contactPhone: '',
    companyWebsite: '',
    companyDescription: '',
    companyLogo: null
  });

  const [newTag, setNewTag] = useState('');
  const [preview, setPreview] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Mock data for existing vacancy (in real app would come from API)
  const mockVacancyData = {
    1: {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "Київ",
      salary: {
        from: "3000",
        to: "5000",
        currency: "USD",
        period: "month"
      },
      experience: "3-5 років",
      employmentType: "Повна зайнятість",
      description: "Шукаємо досвідченого Frontend розробника для роботи над інноваційними проектами. Ви будете працювати з сучасними технологіями та створювати користувацькі інтерфейси світового рівня.",
      requirements: "• Досвід роботи з React 3+ роки\n• Знання TypeScript\n• Досвід роботи з Redux/MobX\n• Розуміння принципів UX/UI",
      responsibilities: "• Розробка нових функціональностей\n• Підтримка існуючого коду\n• Код-рев'ю\n• Менторство молодших розробників",
      benefits: "• Конкурентна заробітна плата\n• Медичне страхування\n• Навчання за рахунок компанії\n• Гнучкий графік роботи",
      tags: ["React", "TypeScript", "Node.js", "Git"],
      isRemote: true,
      contactEmail: "hr@techcorp.com",
      contactPhone: "+380501234567",
      companyWebsite: "https://techcorp.com",
      companyDescription: "TechCorp Solutions - провідна IT-компанія, яка спеціалізується на створенні інноваційних рішень для бізнесу.",
      companyLogo: "/api/placeholder/64/64"
    },
    2: {
      id: 2,
      title: "Backend Developer",
      company: "TechCorp Solutions",
      location: "Львів",
      salary: {
        from: "2500",
        to: "4000",
        currency: "USD",
        period: "month"
      },
      experience: "1-3 роки",
      employmentType: "Повна зайнятість",
      description: "Потрібен Backend розробник для створення надійних серверних рішень та API.",
      requirements: "• Досвід з Python/Django\n• Знання баз даних\n• Розуміння принципів REST API",
      responsibilities: "• Розробка серверної частини\n• Оптимізація продуктивності\n• Робота з базами даних",
      benefits: "• Офіційне працевлаштування\n• Соціальний пакет\n• Можливість росту",
      tags: ["Python", "Django", "PostgreSQL", "Docker"],
      isRemote: false,
      contactEmail: "hr@techcorp.com",
      contactPhone: "+380501234567",
      companyWebsite: "https://techcorp.com",
      companyDescription: "TechCorp Solutions - провідна IT-компанія, яка спеціалізується на створенні інноваційних рішень для бізнесу.",
      companyLogo: "/api/placeholder/64/64"
    }
  };

  // Predefined options
  const experienceOptions = [
    'Без досвіду',
    '1 рік',
    '1-3 роки',
    '3-5 років',
    '5+ років'
  ];

  const employmentTypes = [
    'Повна зайнятість',
    'Часткова зайнятість',
    'Фріланс',
    'Стажування',
    'Контракт'
  ];

  const locations = [
    'Київ',
    'Львів',
    'Харків',
    'Дніпро',
    'Одеса',
    'Запоріжжя',
    'Вінниця',
    'Полтава',
    'Івано-Франківськ',
    'Хмельницький'
  ];

  const currencies = ['USD', 'EUR', 'UAH'];
  const periods = ['month', 'hour', 'project'];

  const popularTags = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'PHP',
    'TypeScript', 'Vue.js', 'Angular', 'Django', 'Spring', 'Laravel',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'SQL', 'MongoDB', 'PostgreSQL'
  ];

  // Load existing vacancy data in edit mode
  useEffect(() => {
    if (isEditMode && vacancyId) {
      const loadVacancyData = async () => {
        try {
          setLoading(true);
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const existingVacancy = mockVacancyData[vacancyId];
          
          if (existingVacancy) {
            setFormData(existingVacancy);
          } else {
            setSubmitStatus({ 
              type: 'error', 
              message: 'Вакансія не знайдена' 
            });
            setTimeout(() => navigate('/employer-dashboard'), 2000);
          }
        } catch (error) {
          setSubmitStatus({ 
            type: 'error', 
            message: 'Помилка завантаження вакансії' 
          });
        } finally {
          setLoading(false);
        }
      };

      loadVacancyData();
    }
  }, [isEditMode, vacancyId, navigate]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePopularTagClick = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          companyLogo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const required = ['title', 'company', 'location', 'experience', 'employmentType', 'description', 'contactEmail'];
    return required.every(field => formData[field]?.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Будь ласка, заповніть всі обов\'язкові поля' });
      return;
    }

    try {
      setSubmitStatus({ 
        type: 'info', 
        message: isEditMode ? 'Зберігається...' : 'Публікується...' 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Підготовка даних для збереження
      const vacancyData = {
        ...formData,
        salary: `${formData.salary.from}-${formData.salary.to} ${formData.salary.currency}`,
        employmentType: formData.employmentType,
        company: formData.company || "TechCorp Solutions"
      };

      // Оновлення localStorage
      updateVacanciesInStorage(vacancyData);

      setSubmitStatus({ 
        type: 'success', 
        message: isEditMode ? 'Вакансія успішно оновлена!' : 'Вакансія успішно опублікована!' 
      });

      // Redirect after success
      setTimeout(() => {
        navigate('/employer-dashboard');
      }, 2000);
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: isEditMode ? 'Помилка при оновленні вакансії' : 'Помилка при публікації вакансії' 
      });
    }
  };

  const updateVacanciesInStorage = (updatedVacancy) => {
  const storedVacancies = JSON.parse(localStorage.getItem('employerVacancies') || '[]');
  
  if (isEditMode) {
    // Оновлення існуючої вакансії
    const updatedVacancies = storedVacancies.map(v => 
      v.id === parseInt(vacancyId) ? { ...v, ...updatedVacancy } : v
    );
    localStorage.setItem('employerVacancies', JSON.stringify(updatedVacancies));
  } else {
    // Додавання нової вакансії
    const newId = storedVacancies.length > 0 ? Math.max(...storedVacancies.map(v => v.id)) + 1 : 1;
    const newVacancy = {
      ...updatedVacancy,
      id: newId,
      postedDate: "Щойно",
      isActive: true,
      views: 0,
      applications: 0,
      companyLogo: formData.companyLogo || "/api/placeholder/48/48"
    };
    storedVacancies.push(newVacancy);
    localStorage.setItem('employerVacancies', JSON.stringify(storedVacancies));
  }
};

  const handleCancel = () => {
    navigate('/employer-dashboard');
  };

  const VacancyPreview = () => (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
          📋 Попередній перегляд
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar
            src={formData.companyLogo}
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#f5f5f5',
              color: '#666',
              fontWeight: 600,
              fontSize: '1.2rem'
            }}
          >
            {formData.company.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ color: '#1c2526' }}>
              {formData.title || 'Назва посади'}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
              {formData.company || 'Назва компанії'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
            <LocationOn fontSize="small" />
            <Typography variant="body2">
              {formData.location || 'Місце роботи'}
            </Typography>
            {formData.isRemote && (
              <Chip label="Remote" size="small" sx={{ ml: 1, backgroundColor: '#e8f5e8', color: '#2e7d32' }} />
            )}
          </Box>
          
          {(formData.salary.from || formData.salary.to) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
              <AttachMoney fontSize="small" />
              <Typography variant="body2" fontWeight={600} color="#2e7d32">
                {formData.salary.from && formData.salary.to 
                  ? `${formData.salary.from}-${formData.salary.to} ${formData.salary.currency}`
                  : formData.salary.from 
                    ? `від ${formData.salary.from} ${formData.salary.currency}`
                    : `до ${formData.salary.to} ${formData.salary.currency}`
                }
              </Typography>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
            <Work fontSize="small" />
            <Typography variant="body2">
              {formData.experience || 'Досвід роботи'}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
          {formData.description.substring(0, 150) || 'Опис вакансії...'}
          {formData.description.length > 150 && '...'}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {formData.tags.slice(0, 6).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#e0e0e0',
                color: '#666',
                fontSize: '0.75rem'
              }}
            />
          ))}
          {formData.tags.length > 6 && (
            <Chip
              label={`+${formData.tags.length - 6}`}
              size="small"
              variant="outlined"
              sx={{ borderColor: '#e0e0e0', color: '#999', fontSize: '0.75rem' }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width={300} height={40} />
              <Skeleton variant="text" width={200} height={20} />
            </Box>
          </Box>
          
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {Array(8).fill(0).map((_, index) => (
                  <Skeleton key={index} variant="rectangular" height={56} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header with back button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <IconButton 
            onClick={handleCancel}
            sx={{ 
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography 
              variant="h4" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ color: '#1c2526' }}
            >
              {isEditMode ? (
                <>
                  <Edit sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Редагування вакансії
                </>
              ) : (
                <>
                  <Add sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Додати нову вакансію
                </>
              )}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
            >
              {isEditMode 
                ? 'Внесіть необхідні зміни до вакансії'
                : 'Заповніть форму, щоб опублікувати вакансію та залучити кращих кандидатів'
              }
            </Typography>
          </Box>
        </Box>

        {submitStatus && (
          <Alert 
            severity={submitStatus.type} 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setSubmitStatus(null)}
          >
            {submitStatus.message}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 3, flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Main Form */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  {/* Company Information */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 3, color: '#1c2526', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Business /> Інформація про компанію
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={formData.companyLogo}
                          sx={{
                            width: 64,
                            height: 64,
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            fontWeight: 600,
                            fontSize: '1.5rem'
                          }}
                        >
                          {formData.company.charAt(0)}
                        </Avatar>
                        <Box>
                          <Button
                            component="label"
                            variant="outlined"
                            startIcon={<FileUpload />}
                            sx={{ 
                              borderColor: '#1c2526',
                              color: '#1c2526',
                              fontFamily: 'Rubik',
                              mb: 1
                            }}
                          >
                            {formData.companyLogo ? 'Змінити логотип' : 'Завантажити логотип'}
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={handleLogoUpload}
                            />
                          </Button>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Рекомендований розмір: 200x200px
                          </Typography>
                        </Box>
                      </Box>

                      <TextField
                        fullWidth
                        label="Назва компанії"
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        variant="outlined"
                      />

                      <TextField
                        fullWidth
                        label="Опис компанії"
                        multiline
                        rows={3}
                        value={formData.companyDescription}
                        onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                        variant="outlined"
                        placeholder="Розкажіть про вашу компанію, її місію та цінності..."
                      />

                      <TextField
                        fullWidth
                        label="Веб-сайт компанії"
                        value={formData.companyWebsite}
                        onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Language /></InputAdornment>
                        }}
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Job Information */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 3, color: '#1c2526', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Work /> Інформація про вакансію
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        fullWidth
                        label="Назва посади"
                        required
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        variant="outlined"
                        placeholder="наприклад: Senior Frontend Developer"
                      />

                      <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                        <Autocomplete
                          sx={{ flex: 1 }}
                          options={locations}
                          value={formData.location}
                          onChange={(e, value) => handleInputChange('location', value)}
                          renderInput={(params) => (
                            <TextField 
                              {...params} 
                              label="Місце роботи" 
                              required
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>
                              }}
                            />
                          )}
                        />

                        <FormControl sx={{ flex: 1 }}>
                          <InputLabel>Досвід роботи *</InputLabel>
                          <Select
                            value={formData.experience}
                            onChange={(e) => handleInputChange('experience', e.target.value)}
                            label="Досвід роботи *"
                            required
                          >
                            {experienceOptions.map(option => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      <FormControl fullWidth>
                        <InputLabel>Тип зайнятості *</InputLabel>
                        <Select
                          value={formData.employmentType}
                          onChange={(e) => handleInputChange('employmentType', e.target.value)}
                          label="Тип зайнятості *"
                          required
                        >
                          {employmentTypes.map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.isRemote}
                            onChange={(e) => handleInputChange('isRemote', e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Віддалена робота"
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Salary */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 3, color: '#1c2526', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney /> Заробітна плата
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                      <TextField
                        label="Від"
                        type="number"
                        value={formData.salary.from}
                        onChange={(e) => handleInputChange('salary.from', e.target.value)}
                        variant="outlined"
                        sx={{ width: 120 }}
                      />
                      <TextField
                        label="До"
                        type="number"
                        value={formData.salary.to}
                        onChange={(e) => handleInputChange('salary.to', e.target.value)}
                        variant="outlined"
                        sx={{ width: 120 }}
                      />
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel>Валюта</InputLabel>
                        <Select
                          value={formData.salary.currency}
                          onChange={(e) => handleInputChange('salary.currency', e.target.value)}
                          label="Валюта"
                        >
                          {currencies.map(currency => (
                            <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Період</InputLabel>
                        <Select
                          value={formData.salary.period}
                          onChange={(e) => handleInputChange('salary.period', e.target.value)}
                          label="Період"
                        >
                          <MenuItem value="month">на місяць</MenuItem>
                          <MenuItem value="hour">за годину</MenuItem>
                          <MenuItem value="project">за проект</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Job Description */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 3, color: '#1c2526' }}>
                      📝 Опис вакансії
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        fullWidth
                        label="Загальний опис"
                        required
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        variant="outlined"
                        placeholder="Опишіть вакансію, що робить ваша команда та яких результатів очікуєте..."
                      />

                      <TextField
                        fullWidth
                        label="Вимоги до кандидата"
                        multiline
                        rows={4}
                        value={formData.requirements}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        variant="outlined"
                        placeholder="Технічні навички, досвід, освіта та інші вимоги..."
                      />

                      <TextField
                        fullWidth
                        label="Обов'язки"
                        multiline
                        rows={4}
                        value={formData.responsibilities}
                        onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                        variant="outlined"
                        placeholder="Що буде робити співробітник на цій посаді..."
                      />

                      <TextField
                        fullWidth
                        label="Що ми пропонуємо"
                        multiline
                        rows={3}
                        value={formData.benefits}
                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                        variant="outlined"
                        placeholder="Пільги, бонуси, можливості розвитку..."
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Tags */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                      🏷️ Технології та навички
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Додати навичку"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        variant="outlined"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleAddTag} disabled={!newTag.trim()}>
                                <Add />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>

                    {/* Popular Tags */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Популярні навички:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {popularTags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            onClick={() => handlePopularTagClick(tag)}
                            disabled={formData.tags.includes(tag)}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: '#e0e0e0'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Selected Tags */}
                    {formData.tags.length > 0 && (
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Вибрані навички:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {formData.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              onDelete={() => handleRemoveTag(tag)}
                              deleteIcon={<Delete />}
                              color="text.secondary"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Contact Information */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 3, color: '#1c2526', display: 'flex', alignItems: 'center', gap: 1 }}>
                      📞 Контактна інформація
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        fullWidth
                        label="Email для зв'язку"
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Email /></InputAdornment>
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Телефон для зв'язку"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                        variant="outlined"
                        placeholder="+380..."
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Form Actions */}
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        setPreview(!preview);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      startIcon={<Preview />}
                      sx={{
                        borderColor: '#1c2526',
                        color: '#1c2526',
                        fontFamily: 'Rubik',
                        px: 3,
                        py: 1.5
                      }}
                    >
                      {preview ? 'Сховати превью' : 'Переглянути'}
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{
                        borderColor: '#999',
                        color: '#999',
                        fontFamily: 'Rubik',
                        px: 3,
                        py: 1.5
                      }}
                    >
                      Скасувати
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!validateForm() || submitStatus?.type === 'info'}
                      startIcon={submitStatus?.type === 'info' ? <CircularProgress size={20} /> : (isEditMode ? <Save /> : <Publish />)}
                      sx={{
                        backgroundColor: '#1c2526',
                        fontFamily: 'Rubik',
                        px: 3,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: '#2c3537'
                        }
                      }}
                    >
                      {submitStatus?.type === 'info' 
                        ? (isEditMode ? 'Зберігається...' : 'Публікується...') 
                        : (isEditMode ? 'Зберегти зміни' : 'Опублікувати вакансію')
                      }
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>

          {/* Preview Sidebar */}
          {preview && !isMobile && (
            <Box sx={{ width: 400 }}>
              <VacancyPreview />
            </Box>
          )}
        </Box>

        {/* Preview for Mobile */}
        {preview && isMobile && (
          <VacancyPreview />
        )}
      </Container>
    </Box>
  );
};

export default AddVacancyPage;