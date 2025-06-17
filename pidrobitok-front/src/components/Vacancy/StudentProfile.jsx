import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid,
  Paper,
  Tooltip,
  Badge
} from '@mui/material';
import {
  MoreVert,
  Visibility,
  Delete,
  LocationOn,
  AttachMoney,
  Work,
  Schedule,
  People,
  TrendingUp,
  School,
  Cancel,
  CheckCircle,
  HourglassEmpty,
  Send
} from '@mui/icons-material';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    withdrawnApplications: 0
  });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  // Mock данні студента (в реальному додатку буде з контексту/API)
  const currentStudent = {
    id: 1,
    email: 'student@example.com',
    firstName: 'Іван',
    lastName: 'Петренко',
    userName: 'student_ivan',
    role: 'student'
  };

  // Отримання повного імені
  const getFullName = (user) => {
    return `${user.firstName} ${user.lastName}`;
  };

  // Отримання ініціалів для аватара
  const getInitials = (user) => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  // Mock дані заявок студента
  useEffect(() => {
    const mockApplications = [
      {
        id: 1,
        vacancyId: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        location: "Київ",
        salary: "3000-5000 USD",
        experience: "3-5 років",
        employmentType: "Повна зайнятість",
        tags: ["React", "TypeScript", "Node.js", "Git"],
        appliedDate: "2 дні тому",
        status: "pending", // pending, withdrawn
        isRemote: true,
        companyLogo: "/api/placeholder/48/48",
        coverLetter: "Шановні представники TechCorp Solutions! Я дуже зацікавлений у позиції Senior Frontend Developer..."
      },
      {
        id: 2,
        vacancyId: 2,
        title: "Backend Developer",
        company: "StartupHub",
        location: "Львів",
        salary: "2500-4000 USD",
        experience: "1-3 роки",
        employmentType: "Повна зайнятість",
        tags: ["Python", "Django", "PostgreSQL", "Docker"],
        appliedDate: "1 тиждень тому",
        status: "pending",
        isRemote: false,
        companyLogo: "/api/placeholder/48/48",
        coverLetter: "Добрий день! Хочу подати заявку на позицію Backend Developer..."
      },
      {
        id: 3,
        vacancyId: 3,
        title: "UI/UX Designer",
        company: "DesignStudio",
        location: "Дніпро",
        salary: "2000-3500 USD",
        experience: "1-3 роки",
        employmentType: "Повна зайнятість",
        tags: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        appliedDate: "3 дні тому",
        status: "withdrawn",
        isRemote: true,
        companyLogo: "/api/placeholder/48/48",
        coverLetter: "Вітаю! Маю великий інтерес до дизайну та користувацького досвіду..."
      }
    ];

    setApplications(mockApplications);
    
    // Розрахунок статистики
    const totalApplications = mockApplications.length;
    const pendingApplications = mockApplications.filter(a => a.status === 'pending').length;
    const withdrawnApplications = mockApplications.filter(a => a.status === 'withdrawn').length;
    
    setStats({
      totalApplications,
      pendingApplications,
      withdrawnApplications
    });
  }, []);

  const handleMenuOpen = (event, application) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedApplication(null);
  };

  const handleViewVacancy = (application) => {
    navigate(`/vacancy/${application.vacancyId}`);
    handleMenuClose();
  };

  const handleWithdraw = () => {
    setWithdrawDialogOpen(true);
    handleMenuClose();
  };

  const handleWithdrawConfirm = async () => {
    try {
      const updatedApplications = applications.map(a => 
        a.id === selectedApplication.id ? { ...a, status: 'withdrawn' } : a
      );
      setApplications(updatedApplications);
      
      // Оновлення статистики
      const pendingApplications = updatedApplications.filter(a => a.status === 'pending').length;
      const withdrawnApplications = updatedApplications.filter(a => a.status === 'withdrawn').length;
      
      setStats(prev => ({ 
        ...prev, 
        pendingApplications,
        withdrawnApplications
      }));
      
      setAlert({
        type: 'success',
        message: 'Заявку успішно відкликано'
      });
      setWithdrawDialogOpen(false);
      setSelectedApplication(null);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Помилка при відкликанні заявки'
      });
    }
  };

  const handleApplicationClick = (application) => {
    navigate(`/vacancy/${application.vacancyId}`);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'На розгляді',
          color: 'warning',
          icon: <HourglassEmpty />
        };
      case 'withdrawn':
        return {
          label: 'Відкликано',
          color: 'default',
          icon: <Cancel />
        };
      default:
        return {
          label: 'Невідомо',
          color: 'default',
          icon: <HourglassEmpty />
        };
    }
  };

  const StatsCard = ({ icon, title, value, color }) => (
    <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 2,
        mb: 1
      }}>
        <Box sx={{ 
          backgroundColor: `${color}15`, 
          borderRadius: 2, 
          p: 1.5,
          color: color
        }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700} color={color}>
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
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '50vw', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                backgroundColor: '#1c2526',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.5rem'
              }}
            >
              {getInitials(currentStudent)}
            </Avatar>
            <Box>
              <Typography 
                variant="h4" 
                fontFamily="Rubik" 
                fontWeight={600}
                sx={{ color: '#1c2526', mb: 1 }}
              >
                {getFullName(currentStudent)}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                @{currentStudent.userName}
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              borderColor: '#1c2526',
              color: '#1c2526',
              fontFamily: 'Rubik',
              fontWeight: 500,
              px: 3,
              py: 1.5,
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#1c2526',
                color: 'white',
                borderColor: '#1c2526'
              }
            }}
          >
            Шукати вакансії
          </Button>
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
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              icon={<Send />}
              title="Всього заявок"
              value={stats.totalApplications}
              color="#1c2526"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              icon={<HourglassEmpty />}
              title="На розгляді"
              value={stats.pendingApplications}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              icon={<Cancel />}
              title="Відкликано"
              value={stats.withdrawnApplications}
              color="#666"
            />
          </Grid>
        </Grid>

        {/* Applications List */}
        <Typography 
          variant="h5" 
          fontFamily="Rubik" 
          fontWeight={600}
          sx={{ mb: 3, color: '#1c2526' }}
        >
          Мої заявки ({applications.length})
        </Typography>

        {applications.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Send sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              У вас поки немає поданих заявок
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: '#1c2526',
                fontFamily: 'Rubik',
                '&:hover': {
                  backgroundColor: '#2c3537'
                }
              }}
            >
              Знайти вакансії
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {applications.map((application) => {
              const statusInfo = getStatusInfo(application.status);
              
              return (
                <Card
                  key={application.id}
                  onClick={() => handleApplicationClick(application)}
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: application.status === 'withdrawn' ? 0.7 : 1,
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
                          src={application.companyLogo}
                          sx={{
                            width: 48,
                            height: 48,
                            backgroundColor: '#f5f5f5',
                            color: '#666'
                          }}
                        >
                          {application.company.charAt(0)}
                        </Avatar>
                        
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Typography
                              variant="h6"
                              fontFamily="Rubik"
                              fontWeight={600}
                              sx={{ color: '#1c2526' }}
                            >
                              {application.title}
                            </Typography>
                            <Chip
                              label={statusInfo.label}
                              size="small"
                              color={statusInfo.color}
                              icon={statusInfo.icon}
                            />
                          </Box>

                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {application.company}
                          </Typography>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                              <LocationOn fontSize="small" />
                              <Typography variant="body2">
                                {application.location}
                              </Typography>
                              {application.isRemote && (
                                <Chip label="Remote" size="small" sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} />
                              )}
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                              <AttachMoney fontSize="small" />
                              <Typography variant="body2" fontWeight={600} color="#2e7d32">
                                {application.salary}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                              <Work fontSize="small" />
                              <Typography variant="body2">
                                {application.experience}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {application.tags.slice(0, 4).map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.75rem', height: 24 }}
                              />
                            ))}
                            {application.tags.length > 4 && (
                              <Chip
                                label={`+${application.tags.length - 4}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.75rem', height: 24 }}
                              />
                            )}
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#999' }}>
                              <Schedule fontSize="small" />
                              <Typography variant="caption">
                                Подано {application.appliedDate}
                              </Typography>
                            </Box>
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
              );
            })}
          </Box>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleViewVacancy(selectedApplication)}>
            <Visibility />
            <Typography sx={{ ml: 1 }}>Переглянути вакансію</Typography>
          </MenuItem>
          {selectedApplication?.status === 'pending' && (
            <MenuItem onClick={handleWithdraw} sx={{ color: '#d32f2f' }}>
              <Cancel />
              <Typography sx={{ ml: 1 }}>Відкликати заявку</Typography>
            </MenuItem>
          )}
        </Menu>

        {/* Withdraw Dialog */}
        <Dialog open={withdrawDialogOpen} onClose={() => setWithdrawDialogOpen(false)}>
          <DialogTitle>Відкликання заявки</DialogTitle>
          <DialogContent>
            <Typography>
              Ви впевнені, що хочете відкликати заявку на вакансію "{selectedApplication?.title}"?
              Цю дію неможливо скасувати.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setWithdrawDialogOpen(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleWithdrawConfirm} 
              color="error" 
              variant="contained"
            >
              Відкликати
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default StudentProfile;