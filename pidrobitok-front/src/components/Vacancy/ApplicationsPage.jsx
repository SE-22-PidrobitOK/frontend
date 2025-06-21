import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Tabs,
  Tab,
  Badge,
  Paper,
  Grid,
  Tooltip
} from '@mui/material';
import {
  ArrowBack,
  Email,
  Person,
  Work,
  Schedule,
  Visibility,
  MoreVert,
  Check,
  Close,
  Reply,
  Delete,
  AttachMoney,
  LocationOn,
  Business
} from '@mui/icons-material';

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [coverLetterDialogOpen, setCoverLetterDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [alert, setAlert] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    accepted: 0,
    rejected: 0
  });

  // Mock дані заявок
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        vacancyId: 1,
        vacancyTitle: "Senior Frontend Developer",
        applicantName: "Олександр",
        applicantSurname: "Петренко",
        applicantEmail: "oleksandr.petrenko@example.com",
        appliedDate: "2024-06-15",
        status: "new", // new, accepted, rejected
        coverLetter: "Доброго дня!\n\nМене звати Олександр Петренко, я досвідчений Frontend розробник з 4-річним досвідом роботи з React та TypeScript.\n\nПротягом останніх років я працював над різноманітними проектами - від корпоративних веб-сайтів до складних SPA додатків. Маю глибокі знання у React, Redux, TypeScript, а також досвід роботи з Node.js та Express.\n\nОсобливо цікавить можливість працювати над інноваційними проектами у вашій компанії. Готовий взяти участь у співбесіді в будь-який зручний для вас час.\n\nДякую за розгляд моєї кандидатури!\n\nЗ повагою,\nОлександр Петренко",
        avatar: "/api/placeholder/48/48"
      },
      {
        id: 2,
        vacancyId: 1,
        vacancyTitle: "Senior Frontend Developer",
        applicantName: "Марія",
        applicantSurname: "Коваленко",
        applicantEmail: "maria.kovalenko@example.com",
        appliedDate: "2024-06-14",
        status: "accepted",
        coverLetter: "Вітаю!\n\nЯ Марія Коваленко, Frontend розробник з 3+ років досвіду. Спеціалізуюся на React, Vue.js та сучасних фронтенд технологіях.\n\nМаю досвід створення responsive додатків, роботи з REST API та GraphQL. Також працювала з командами в Agile середовищі.\n\nБуду рада обговорити можливість співпраці!\n\nДякую!",
        avatar: "/api/placeholder/48/48"
      },
      {
        id: 3,
        vacancyId: 2,
        vacancyTitle: "Backend Developer",
        applicantName: "Дмитро",
        applicantSurname: "Сидоренко",
        applicantEmail: "dmytro.sydorenko@example.com",
        appliedDate: "2024-06-13",
        status: "new",
        coverLetter: "Добрий день!\n\nМене звати Дмитро Сидоренко. Я Backend розробник з досвідом роботи з Python, Django та PostgreSQL.\n\nПротягом 2 років працював над веб-додатками різної складності. Маю досвід оптимізації баз даних, створення REST API та роботи з Docker.\n\nЗацікавлений у вашій пропозиції та готовий до співбесіди.\n\nДякую за увагу!",
        avatar: "/api/placeholder/48/48"
      },
      {
        id: 4,
        vacancyId: 3,
        vacancyTitle: "UI/UX Designer",
        applicantName: "Анна",
        applicantSurname: "Мельник",
        applicantEmail: "anna.melnyk@example.com",
        appliedDate: "2024-06-12",
        status: "rejected",
        coverLetter: "Доброго дня!\n\nЯ Анна Мельник, UI/UX дизайнер з 2 роками досвіду.\n\nВолодію Figma, Adobe XD, Sketch. Маю досвід створення дизайн-систем та прототипування.\n\nБуду рада приєднатися до вашої команди!\n\nЗ повагою, Анна",
        avatar: "/api/placeholder/48/48"
      },
      {
        id: 5,
        vacancyId: 1,
        vacancyTitle: "Senior Frontend Developer",
        applicantName: "Ігор",
        applicantSurname: "Шевченко",
        applicantEmail: "ihor.shevchenko@example.com",
        appliedDate: "2024-06-11",
        status: "new",
        coverLetter: "Вітаю!\n\nІгор Шевченко, Frontend розробник з 5 років досвіду.\n\nСпеціалізуюся на React, Next.js, TypeScript. Також маю досвід з мобільною розробкою на React Native.\n\nГотовий розпочати роботу найближчим часом.\n\nДякую!",
        avatar: "/api/placeholder/48/48"
      }
    ];

    setApplications(mockApplications);
    setFilteredApplications(mockApplications);

    // Розрахунок статистики
    const stats = {
      total: mockApplications.length,
      new: mockApplications.filter(app => app.status === 'new').length,
      accepted: mockApplications.filter(app => app.status === 'accepted').length,
      rejected: mockApplications.filter(app => app.status === 'rejected').length
    };
    setStats(stats);
  }, []);

  // Фільтрація заявок за статусом
  useEffect(() => {
    let filtered = applications;
    
    switch (currentTab) {
      case 1: // Нові
        filtered = applications.filter(app => app.status === 'new');
        break;
      case 2: // Прийняті
        filtered = applications.filter(app => app.status === 'accepted');
        break;
      case 3: // Відхилені
        filtered = applications.filter(app => app.status === 'rejected');
        break;
      default: // Всі
        filtered = applications;
    }
    
    setFilteredApplications(filtered);
  }, [currentTab, applications]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event, application) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    // НЕ очищуємо selectedApplication тут, щоб воно залишалось для діалогу
  };

  const handleCloseDialog = () => {
    setCoverLetterDialogOpen(false);
    setSelectedApplication(null); // Очищуємо тільки при закритті діалогу
  };

  const handleViewCoverLetter = (application) => {
    setSelectedApplication(application);
    setCoverLetterDialogOpen(true);
    handleMenuClose();
  };

  const handleUpdateStatus = (status) => {
    if (!selectedApplication) return;

    const updatedApplications = applications.map(app =>
      app.id === selectedApplication.id
        ? { ...app, status }
        : app
    );

    setApplications(updatedApplications);

    // Оновлення статистики
    const newStats = {
      total: updatedApplications.length,
      new: updatedApplications.filter(app => app.status === 'new').length,
      accepted: updatedApplications.filter(app => app.status === 'accepted').length,
      rejected: updatedApplications.filter(app => app.status === 'rejected').length
    };
    setStats(newStats);

    const statusText = {
      accepted: 'прийнята',
      rejected: 'відхилена',
      new: 'позначена як нова'
    };

    setAlert({
      type: 'success',
      message: `Заявка ${statusText[status]}`
    });

    handleMenuClose();
    setSelectedApplication(null);
  };

  const handleDeleteApplication = () => {
    if (!selectedApplication) return;

    const updatedApplications = applications.filter(app => app.id !== selectedApplication.id);
    setApplications(updatedApplications);

    // Оновлення статистики
    const newStats = {
      total: updatedApplications.length,
      new: updatedApplications.filter(app => app.status === 'new').length,
      accepted: updatedApplications.filter(app => app.status === 'accepted').length,
      rejected: updatedApplications.filter(app => app.status === 'rejected').length
    };
    setStats(newStats);

    setAlert({
      type: 'success',
      message: 'Заявка видалена'
    });

    handleMenuClose();
    setSelectedApplication(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#2196f3';
      case 'accepted': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Нова';
      case 'accepted': return 'Прийнята';
      case 'rejected': return 'Відхилена';
      default: return 'Невідомо';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StatsCard = ({ icon, title, value, color }) => (
    <Paper sx={{ p: 2.5, borderRadius: 2, textAlign: 'center' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 1.5,
        mb: 1
      }}>
        <Box sx={{ 
          backgroundColor: `${color}15`, 
          borderRadius: 1.5, 
          p: 1,
          color: color
        }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={700} color={color}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton 
            onClick={() => navigate('/employer-dashboard')}
            sx={{ 
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
              sx={{ color: '#1c2526', mb: 0.5 }}
            >
              Заявки на вакансії
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Переглядайте та керуйте заявками від кандидатів
            </Typography>
          </Box>
        </Box>

        {/* Alert */}
        {alert && (
          <Alert 
            severity={alert.type} 
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        )}

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Business />}
              title="Всього заявок"
              value={stats.total}
              color="#1c2526"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Schedule />}
              title="Нових"
              value={stats.new}
              color="#2196f3"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Check />}
              title="Прийнятих"
              value={stats.accepted}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Close />}
              title="Відхилених"
              value={stats.rejected}
              color="#f44336"
            />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            sx={{ px: 2 }}
          >
            <Tab 
              label={
                <Badge badgeContent={stats.total} color="default">
                  <Box sx={{ ml: stats.total > 0 ? 2 : 0 }}>
                    Всі заявки
                  </Box>
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={stats.new} color="info">
                  <Box sx={{ ml: stats.new > 0 ? 2 : 0 }}>
                    Нові
                  </Box>
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={stats.accepted} color="success">
                  <Box sx={{ ml: stats.accepted > 0 ? 2 : 0 }}>
                    Прийняті
                  </Box>
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={stats.rejected} color="error">
                  <Box sx={{ ml: stats.rejected > 0 ? 2 : 0 }}>
                    Відхилені
                  </Box>
                </Badge>
              } 
            />
          </Tabs>
        </Paper>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Person sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {currentTab === 0 ? 'Поки немає заявок' : 'Немає заявок у цій категорії'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Заявки з'являться тут, коли кандидати почнуть відгукуватися на ваші вакансії
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredApplications.map((application) => (
              <Card
                key={application.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                      <Avatar
                        src={application.avatar}
                        sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: '#e3f2fd',
                          color: '#1976d2',
                          fontSize: '1.5rem',
                          fontWeight: 600
                        }}
                      >
                        {application.applicantName.charAt(0)}{application.applicantSurname.charAt(0)}
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography
                            variant="h6"
                            fontFamily="Rubik"
                            fontWeight={600}
                            sx={{ color: '#1c2526' }}
                          >
                            {application.applicantName} {application.applicantSurname}
                          </Typography>
                          <Chip
                            label={getStatusText(application.status)}
                            size="small"
                            sx={{
                              backgroundColor: `${getStatusColor(application.status)}15`,
                              color: getStatusColor(application.status),
                              fontWeight: 500
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, color: '#666' }}>
                          <Email fontSize="small" />
                          <Typography variant="body2">
                            {application.applicantEmail}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, color: '#666' }}>
                          <Work fontSize="small" />
                          <Typography variant="body2" fontWeight={500}>
                            {application.vacancyTitle}
                          </Typography>
                        </Box>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.5
                          }}
                        >
                          {application.coverLetter}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#999' }}>
                            <Schedule fontSize="small" />
                            <Typography variant="caption">
                              Подано {formatDate(application.appliedDate)}
                            </Typography>
                          </Box>
                          
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => handleViewCoverLetter(application)}
                            sx={{
                              color: '#1c2526',
                              fontFamily: 'Rubik',
                              '&:hover': {
                                backgroundColor: '#f5f5f5'
                              }
                            }}
                          >
                            Повний лист
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    <IconButton
                      onClick={(e) => handleMenuOpen(e, application)}
                      sx={{ color: '#666' }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleViewCoverLetter(selectedApplication)}>
            <Visibility sx={{ mr: 1 }} />
            Переглянути лист
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => handleUpdateStatus('accepted')}
            sx={{ color: '#4caf50' }}
          >
            <Check sx={{ mr: 1 }} />
            Прийняти
          </MenuItem>
          <MenuItem 
            onClick={() => handleUpdateStatus('rejected')}
            sx={{ color: '#f44336' }}
          >
            <Close sx={{ mr: 1 }} />
            Відхилити
          </MenuItem>
          <MenuItem onClick={() => handleUpdateStatus('new')}>
            <Schedule sx={{ mr: 1 }} />
            Позначити як нову
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDeleteApplication} sx={{ color: '#d32f2f' }}>
            <Delete sx={{ mr: 1 }} />
            Видалити
          </MenuItem>
        </Menu>

        {/* Cover Letter Dialog */}
        <Dialog 
          open={coverLetterDialogOpen} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedApplication && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={selectedApplication.avatar}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2'
                    }}
                  >
                    {selectedApplication.applicantName.charAt(0)}
                    {selectedApplication.applicantSurname.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
                      Супровідний лист
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      від {selectedApplication.applicantName} {selectedApplication.applicantSurname}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mb: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Вакансія:</strong> {selectedApplication.vacancyTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {selectedApplication.applicantEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Дата подання:</strong> {formatDate(selectedApplication.appliedDate)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography 
                  variant="body1" 
                  sx={{ 
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                    color: '#333'
                  }}
                >
                  {selectedApplication.coverLetter}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>
                  Закрити
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Reply />}
                  sx={{
                    borderColor: '#1c2526',
                    color: '#1c2526',
                    '&:hover': {
                      backgroundColor: '#1c2526',
                      color: 'white'
                    }
                  }}
                >
                  Відповісти
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default ApplicationsPage;