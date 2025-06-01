import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Chip,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Work,
  AttachMoney,
  Schedule,
  Bookmark,
  BookmarkBorder,
  Share,
  Send,
  CheckCircle,
  Business,
  Groups,
  Language,
  School,
  TrendingUp,
  Star,
  NavigateNext
} from '@mui/icons-material';

// Mock data для всіх вакансій
const mockVacanciesData = {
  1: {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Київ",
    salary: "$3000-5000",
    experience: "3+ років",
    employmentType: "Повна зайнятість",
    tags: ["React", "TypeScript", "Next.js", "Redux", "Material-UI", "Jest"],
    description: `Ми шукаємо досвідченого Frontend розробника для приєднання до нашої динамічної команди розробки. 

Ви будете відповідальні за створення сучасних, інтуїтивних веб-додатків, використовуючи найновіші технології та найкращі практики розробки.

Наша команда працює над інноваційними проектами в сфері фінансових технологій, і ми пропонуємо можливість для професійного розвитку та кар'єрного зростання.`,
    requirements: [
      "3+ років досвіду розробки на React",
      "Глибоке розуміння JavaScript (ES6+) та TypeScript",
      "Досвід роботи з Redux, Context API або іншими state management бібліотеками",
      "Знання HTML5, CSS3, SASS/SCSS",
      "Досвід роботи з REST API та GraphQL",
      "Розуміння принципів responsive design",
      "Знання систем контролю версій (Git)",
      "Англійська мова на рівні Intermediate+"
    ],
    responsibilities: [
      "Розробка та підтримка frontend частини веб-додатків",
      "Співпраця з UX/UI дизайнерами для реалізації макетів",
      "Оптимізація продуктивності додатків",
      "Написання чистого, підтримуваного коду",
      "Участь в code review та менторинг молодших розробників",
      "Інтеграція з backend API",
      "Написання unit та integration тестів"
    ],
    benefits: [
      "Конкурентна заробітна плата",
      "Гнучкий графік роботи",
      "Можливість віддаленої роботи",
      "Медичне страхування",
      "Оплачувані відпустки та лікарняні",
      "Навчання та розвиток за рахунок компанії",
      "Сучасне обладнання та офіс",
      "Корпоративні заходи та team building"
    ],
    postedDate: "2 дні тому",
    applicantsCount: 24,
    isRemote: true,
    companyLogo: null,
    companyInfo: {
      name: "TechCorp",
      description: "Провідна IT-компанія, що спеціалізується на розробці фінансових технологій та інноваційних рішень.",
      employees: "200-500",
      industry: "Фінансові технології",
      website: "https://techcorp.com",
      founded: "2015"
    }
  },
  2: {
    id: 2,
    title: "Full Stack JavaScript Developer",
    company: "StartupHub",
    location: "Львів / Remote",
    salary: "$2500-4000",
    experience: "2+ років",
    employmentType: "Повна зайнятість",
    tags: ["Node.js", "React", "MongoDB", "Express"],
    description: `Приєднуйся до нашої команди і розвивай інноваційні продукти в стартап середовищі.
    
Ми створюємо революційні рішення для e-commerce та працюємо з новітніми технологіями.`,
    requirements: [
      "2+ років досвіду з JavaScript",
      "Знання Node.js та Express",
      "Досвід роботи з React",
      "Розуміння баз даних MongoDB",
      "Знання REST API"
    ],
    responsibilities: [
      "Розробка full-stack додатків",
      "Створення API",
      "Робота з базами даних",
      "Тестування коду"
    ],
    benefits: [
      "Гнучкий графік",
      "Віддалена робота",
      "Навчання",
      "Молода команда"
    ],
    postedDate: "1 день тому",
    applicantsCount: 15,
    isRemote: true,
    companyLogo: null,
    companyInfo: {
      name: "StartupHub",
      description: "Молода та амбітна команда, що створює інноваційні e-commerce рішення.",
      employees: "10-50",
      industry: "E-commerce",
      website: "https://startuphub.com",
      founded: "2020"
    }
  }
};

const VacancyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [vacancy, setVacancy] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симулюємо завантаження даних
    const vacancyId = parseInt(id);
    const vacancyData = mockVacanciesData[vacancyId];
    
    if (vacancyData) {
      setVacancy(vacancyData);
    }
    setLoading(false);

    // Перевіряємо, чи потрібно відкрити модалку подачі заявки
    if (searchParams.get('apply') === 'true') {
      setApplyDialogOpen(true);
    }
  }, [id, searchParams]);

  const handleBackToVacancies = () => {
    navigate('/');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    setApplied(true);
    setApplyDialogOpen(false);
    setCoverLetter('');
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareDialogOpen(false);
  };

  const handleRelatedVacancyClick = (vacancyId) => {
    navigate(`/vacancy/${vacancyId}`);
  };

  const relatedVacancies = [
    {
      id: 2,
      title: "Frontend Developer (React)",
      company: "StartupHub",
      salary: "$2500-4000",
      location: "Львів"
    },
    {
      id: 3,
      title: "Full Stack JavaScript Developer",
      company: "WebSolutions",
      salary: "$3200-4800",
      location: "Київ"
    },
    {
      id: 4,
      title: "React Native Developer",
      company: "MobileFirst",
      salary: "$2800-4200",
      location: "Remote"
    }
  ];

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Typography>Завантаження...</Typography>
      </Box>
    );
  }

  if (!vacancy) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
        <Container maxWidth="lg">
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Вакансію не знайдено
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleBackToVacancies}
              sx={{
                borderColor: '#1c2526',
                color: '#1c2526',
                fontFamily: 'Rubik',
                '&:hover': {
                  backgroundColor: '#1c2526',
                  color: 'white'
                }
              }}
            >
              Повернутися до вакансій
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', width: '60vw', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link 
            color="inherit" 
            onClick={handleBackToVacancies}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            <ArrowBack sx={{ mr: 0.5, fontSize: '1rem' }} />
            Вакансії
          </Link>
          <Typography color="text.primary" fontFamily="Rubik">
            {vacancy.title}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={3} direction="column" alignItems="center">
          {/* Main Content */}
          <Grid item xs={12} md={8} size={12}>
            {/* Header Card */}
            <Paper sx={{ p: 4, mb: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
                  <Avatar
                    src={vacancy.companyLogo}
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: '#1c2526',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1.5rem'
                    }}
                  >
                    {vacancy.company.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h4"
                      fontFamily="Rubik"
                      fontWeight={600}
                      sx={{ color: '#1c2526', mb: 1, lineHeight: 1.2 }}
                    >
                      {vacancy.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: '#666', fontWeight: 500, mb: 2 }}
                    >
                      {vacancy.company}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Поділитися">
                    <IconButton
                      onClick={handleShare}
                      sx={{
                        color: '#666',
                        '&:hover': { backgroundColor: '#f5f5f5', color: '#333' }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={isSaved ? "Видалити з збережених" : "Зберегти"}>
                    <IconButton
                      onClick={handleSave}
                      sx={{
                        color: isSaved ? '#ff6b6b' : '#666',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                          color: isSaved ? '#ff5252' : '#333'
                        }
                      }}
                    >
                      {isSaved ? <Bookmark /> : <BookmarkBorder />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Job Details */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666' }}>
                    <LocationOn fontSize="small" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Локація
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {vacancy.location}
                      </Typography>
                      {vacancy.isRemote && (
                        <Chip
                          label="Remote OK"
                          size="small"
                          sx={{
                            mt: 0.5,
                            height: 18,
                            fontSize: '0.65rem',
                            backgroundColor: '#e8f5e8',
                            color: '#2e7d32'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666' }}>
                    <AttachMoney fontSize="small" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Зарплата
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="#2e7d32">
                        {vacancy.salary}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666' }}>
                    <Work fontSize="small" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Досвід
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {vacancy.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666' }}>
                    <Schedule fontSize="small" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Опубліковано
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {vacancy.postedDate}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Technologies */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                  Технології
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {vacancy.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="outlined"
                      sx={{
                        borderColor: '#1c2526',
                        color: '#1c2526',
                        fontFamily: 'Rubik',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: '#1c2526',
                          color: 'white'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Apply Button */}
              {!applied ? (
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Send />}
                  onClick={() => setApplyDialogOpen(true)}
                  sx={{
                    borderColor: '#1c2526',
                    color: '#1c2526',
                    fontFamily: 'Rubik',
                    fontWeight: 600,
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#2c3537',
                      color: 'white',
                      borderColor: '#1c2526'
                    }
                  }}
                >
                  Відгукнутися на вакансію
                </Button>
              ) : (
                <Alert 
                  icon={<CheckCircle fontSize="inherit" />} 
                  severity="success"
                  sx={{ 
                    backgroundColor: '#e8f5e8',
                    '& .MuiAlert-icon': { color: '#2e7d32' }
                  }}
                >
                  <Typography fontFamily="Rubik" fontWeight={500}>
                    Ваш відгук успішно надісланий!
                  </Typography>
                </Alert>
              )}
            </Paper>

            {/* Job Description */}
            <Paper sx={{ p: 4, mb: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
              <Typography variant="h5" fontFamily="Rubik" fontWeight={600} sx={{ mb: 3, color: '#1c2526' }}>
                Опис вакансії
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  color: '#444',
                  whiteSpace: 'pre-line',
                  mb: 3
                }}
              >
                {vacancy.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Requirements */}
              <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                Вимоги
              </Typography>
              <List sx={{ mb: 3 }}>
                {vacancy.requirements.map((requirement, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle sx={{ color: '#2e7d32', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                          {requirement}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              {/* Responsibilities */}
              <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                Обов'язки
              </Typography>
              <List sx={{ mb: 3 }}>
                {vacancy.responsibilities.map((responsibility, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Star sx={{ color: '#ff9800', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                          {responsibility}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              {/* Benefits */}
              <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                Що ми пропонуємо
              </Typography>
              <List>
                {vacancy.benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <TrendingUp sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                          {benefit}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Company Info */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                Про компанію
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#1c2526',
                    color: 'white',
                    fontWeight: 600
                  }}
                >
                  {vacancy.companyInfo.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
                    {vacancy.companyInfo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vacancy.companyInfo.industry}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: '#666' }}>
                {vacancy.companyInfo.description}
              </Typography>

              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Groups fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Розмір компанії"
                    secondary={`${vacancy.companyInfo.employees} співробітників`}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Business fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Заснована"
                    secondary={vacancy.companyInfo.founded}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Language fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Веб-сайт"
                    secondary={
                      <Link href={vacancy.companyInfo.website} target="_blank">
                        {vacancy.companyInfo.website}
                      </Link>
                    }
                  />
                </ListItem>
              </List>
            </Paper>

            {/* Job Stats */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                Статистика
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={600} color="#1c2526">
                    {vacancy.applicantsCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Відгуків
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight={600} color="#1c2526">
                    2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Дні онлайн
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Similar Vacancies */}
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 2, color: '#1c2526' }}>
                Схожі вакансії
              </Typography>
              {relatedVacancies.map((job) => (
                <Card key={job.id} sx={{ mb: 2, cursor: 'pointer', '&:hover': { boxShadow: 2 } }} onClick={() => handleRelatedVacancyClick(job.id)}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {job.company}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {job.location}
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="#2e7d32">
                        {job.salary}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>

        {/* Apply Dialog */}
        <Dialog
          open={applyDialogOpen}
          onClose={() => setApplyDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
              Відгукнутися на вакансію
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {vacancy.title} • {vacancy.company}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              multiline
              rows={6}
              fullWidth
              placeholder="Супровідний лист (опціонально)..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Ваше резюме буде автоматично додане до заявки
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setApplyDialogOpen(false)}
              sx={{ color: '#666' }}
            >
              Скасувати
            </Button>
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{
                backgroundColor: '#1c2526',
                '&:hover': { backgroundColor: '#2c3537' }
              }}
            >
              Надіслати заявку
            </Button>
          </DialogActions>
        </Dialog>

        {/* Share Dialog */}
        <Dialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
              Поділитися вакансією
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Скопіюйте посилання на вакансію
            </Typography>
            <TextField
              fullWidth
              value={typeof window !== 'undefined' ? window.location.href : ''}
              InputProps={{
                readOnly: true,
              }}
              size="small"
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setShareDialogOpen(false)}
              sx={{ color: '#666' }}
            >
              Закрити
            </Button>
            <Button
              variant="contained"
              onClick={copyToClipboard}
              sx={{
                backgroundColor: '#1c2526',
                '&:hover': { 
                    backgroundColor: '#2c3537'
                 }
              }}
            >
              Копіювати
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default VacancyDetailPage;