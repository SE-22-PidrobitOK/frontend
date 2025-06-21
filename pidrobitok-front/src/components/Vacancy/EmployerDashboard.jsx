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
  TextField,
  Alert,
  Fab,
  Grid,
  Paper,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  LocationOn,
  AttachMoney,
  Work,
  Schedule,
  People,
  TrendingUp,
  Business,
  Pause,
  PlayArrow
} from '@mui/icons-material';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [stats, setStats] = useState({
    totalVacancies: 0,
    activeVacancies: 0,
    totalViews: 0,
    totalApplications: 0
  });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [alert, setAlert] = useState(null);

  // Mock данные роботодавця (в реальному додатку буде з контексту/API)
  const currentEmployer = {
    id: 1,
    companyName: "TechCorp Solutions",
    logo: "/api/placeholder/64/64"
  };

  // Mock дані вакансій роботодавця
  useEffect(() => {
  // Спочатку завантажуємо дані з localStorage або використовуємо mock дані
  const storedVacancies = JSON.parse(localStorage.getItem('employerVacancies') || '[]');
  
  let initialVacancies;
  if (storedVacancies.length === 0) {
    // Якщо в localStorage немає даних, використовуємо mock дані
    initialVacancies = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        location: "Київ",
        salary: "3000-5000 USD",
        experience: "3-5 років",
        employmentType: "Повна зайнятість",
        tags: ["React", "TypeScript", "Node.js", "Git"],
        description: "Шукаємо досвідченого Frontend розробника для роботи над інноваційними проектами...",
        postedDate: "2 дні тому",
        isRemote: true,
        isActive: true,
        views: 124,
        applications: 8,
        companyLogo: "/api/placeholder/48/48"
      },
      {
        id: 2,
        title: "Backend Developer",
        company: "TechCorp Solutions",
        location: "Львів",
        salary: "2500-4000 USD",
        experience: "1-3 роки",
        employmentType: "Повна зайнятість",
        tags: ["Python", "Django", "PostgreSQL", "Docker"],
        description: "Потрібен Backend розробник для створення надійних серверних рішень...",
        postedDate: "1 тиждень тому",
        isRemote: false,
        isActive: true,
        views: 89,
        applications: 12,
        companyLogo: "/api/placeholder/48/48"
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "TechCorp Solutions",
        location: "Дніпро",
        salary: "2000-3500 USD",
        experience: "1-3 роки",
        employmentType: "Повна зайнятість",
        tags: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        description: "Шукаємо креативного дизайнера для створення чудових користувацьких інтерфейсів...",
        postedDate: "3 дні тому",
        isRemote: true,
        isActive: false,
        views: 67,
        applications: 5,
        companyLogo: "/api/placeholder/48/48"
      }
    ];
    // Зберігаємо початкові дані в localStorage
    localStorage.setItem('employerVacancies', JSON.stringify(initialVacancies));
  } else {
    initialVacancies = storedVacancies;
  }

  setVacancies(initialVacancies);
  
  // Розрахунок статистики
  const totalVacancies = initialVacancies.length;
  const activeVacancies = initialVacancies.filter(v => v.isActive).length;
  const totalViews = initialVacancies.reduce((sum, v) => sum + v.views, 0);
  const totalApplications = initialVacancies.reduce((sum, v) => sum + v.applications, 0);
  
  setStats({
    totalVacancies,
    activeVacancies,
    totalViews,
    totalApplications
  });
}, []);

// Функція для синхронізації змін з localStorage
  const syncWithStorage = (updatedVacancies) => {
    localStorage.setItem('employerVacancies', JSON.stringify(updatedVacancies));
  };

  const handleMenuOpen = (event, vacancy) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedVacancy(vacancy);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedVacancy(null);
  };

  const handleToggleActive = async (vacancy) => {
    try {
      const updatedVacancies = vacancies.map(v => 
        v.id === vacancy.id ? { ...v, isActive: !v.isActive } : v
      );
      setVacancies(updatedVacancies);
      syncWithStorage(updatedVacancies);
      
      // Оновлення статистики
      const activeVacancies = updatedVacancies.filter(v => v.isActive).length;
      setStats(prev => ({ ...prev, activeVacancies }));
      
      setAlert({
        type: 'success',
        message: `Вакансія ${vacancy.isActive ? 'деактивована' : 'активована'}`
      });
      handleMenuClose();
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Помилка при зміні статусу вакансії'
      });
    }
  };

  const handleEdit = (vacancy) => {
  navigate(`/edit-vacancy/${vacancy.id}`, {
    state: { vacancyId: vacancy.id }
  });
  handleMenuClose();
};

  const handleEditSave = async () => {
    try {
      const updatedVacancies = vacancies.map(v => 
        v.id === selectedVacancy.id ? { ...v, ...editFormData } : v
      );
      setVacancies(updatedVacancies);
      
      setAlert({
        type: 'success',
        message: 'Вакансія успішно оновлена'
      });
      setEditDialogOpen(false);
      setSelectedVacancy(null);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Помилка при оновленні вакансії'
      });
    }
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      const updatedVacancies = vacancies.filter(v => v.id !== selectedVacancy.id);
      setVacancies(updatedVacancies);
      syncWithStorage(updatedVacancies);
      
      // Оновлення статистики
      const totalVacancies = updatedVacancies.length;
      const activeVacancies = updatedVacancies.filter(v => v.isActive).length;
      const totalViews = updatedVacancies.reduce((sum, v) => sum + v.views, 0);
      const totalApplications = updatedVacancies.reduce((sum, v) => sum + v.applications, 0);
      
      setStats({
        totalVacancies,
        activeVacancies,
        totalViews,
        totalApplications
      });
      
      setAlert({
        type: 'success',
        message: 'Вакансія успішно видалена'
      });
      setDeleteDialogOpen(false);
      setSelectedVacancy(null);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Помилка при видаленні вакансії'
      });
    }
  };

  const handleVacancyClick = (vacancyId) => {
    navigate(`/vacancy/${vacancyId}`);
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
          <Box>
            <Typography 
              variant="h4" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ color: '#1c2526', mb: 1 }}
            >
              Панель роботодавця
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Керуйте своїми вакансіями та відстежуйте статистику
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => navigate('/applications')}
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
            Переглянути заявки
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => navigate('/add-vacancy')}
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
            Додати вакансію
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
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Business />}
              title="Всього вакансій"
              value={stats.totalVacancies}
              color="#1c2526"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<PlayArrow />}
              title="Активних"
              value={stats.activeVacancies}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Visibility />}
              title="Переглядів"
              value={stats.totalViews}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<People />}
              title="Відгуків"
              value={stats.totalApplications}
              color="#ed6c02"
            />
          </Grid>
        </Grid>

        {/* Vacancies List */}
        <Typography 
          variant="h5" 
          fontFamily="Rubik" 
          fontWeight={600}
          sx={{ mb: 3, color: '#1c2526' }}
        >
          Мої вакансії ({vacancies.length})
        </Typography>

        {vacancies.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Business sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              У вас поки немає опублікованих вакансій
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/add-vacancy')}
              sx={{
                backgroundColor: '#1c2526',
                fontFamily: 'Rubik',
                '&:hover': {
                  backgroundColor: '#2c3537'
                }
              }}
            >
              Створити першу вакансію
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {vacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                onClick={() => handleVacancyClick(vacancy.id)}
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: vacancy.isActive ? 1 : 0.7,
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
                        src={vacancy.companyLogo}
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: '#f5f5f5',
                          color: '#666'
                        }}
                      >
                        {vacancy.company.charAt(0)}
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography
                            variant="h6"
                            fontFamily="Rubik"
                            fontWeight={600}
                            sx={{ color: '#1c2526' }}
                          >
                            {vacancy.title}
                          </Typography>
                          <Chip
                            label={vacancy.isActive ? "Активна" : "Неактивна"}
                            size="small"
                            color={vacancy.isActive ? "success" : "default"}
                            icon={vacancy.isActive ? <PlayArrow /> : <Pause />}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                            <LocationOn fontSize="small" />
                            <Typography variant="body2">
                              {vacancy.location}
                            </Typography>
                            {vacancy.isRemote && (
                              <Chip label="Remote" size="small" sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} />
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                            <AttachMoney fontSize="small" />
                            <Typography variant="body2" fontWeight={600} color="#2e7d32">
                              {vacancy.salary}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                            <Work fontSize="small" />
                            <Typography variant="body2">
                              {vacancy.experience}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {vacancy.tags.slice(0, 4).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', height: 24 }}
                            />
                          ))}
                          {vacancy.tags.length > 4 && (
                            <Chip
                              label={`+${vacancy.tags.length - 4}`}
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
                              {vacancy.postedDate}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Badge badgeContent={vacancy.views} color="primary">
                              <Tooltip title="Переглядів">
                                <Visibility fontSize="small" sx={{ color: '#666' }} />
                              </Tooltip>
                            </Badge>
                            <Badge badgeContent={vacancy.applications} color="secondary">
                              <Tooltip title="Відгуків">
                                <People fontSize="small" sx={{ color: '#666' }} />
                              </Tooltip>
                            </Badge>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <IconButton
                      onClick={(e) => handleMenuOpen(e, vacancy)}
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
          <MenuItem onClick={() => handleToggleActive(selectedVacancy)}>
            {selectedVacancy?.isActive ? <VisibilityOff /> : <Visibility />}
            <Typography sx={{ ml: 1 }}>
              {selectedVacancy?.isActive ? 'Деактивувати' : 'Активувати'}
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleEdit(selectedVacancy)}>
            <Edit />
            <Typography sx={{ ml: 1 }}>Редагувати</Typography>
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: '#d32f2f' }}>
            <Delete />
            <Typography sx={{ ml: 1 }}>Видалити</Typography>
          </MenuItem>
        </Menu>

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Видалення вакансії</DialogTitle>
          <DialogContent>
            <Typography>
              Ви впевнені, що хочете видалити вакансію "{selectedVacancy?.title}"?
              Цю дію неможливо скасувати.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
            >
              Видалити
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Швидке редагування</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                label="Назва посади"
                value={editFormData.title || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Заробітна плата"
                value={editFormData.salary || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, salary: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Місце роботи"
                value={editFormData.location || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleEditSave} 
              variant="contained"
              sx={{ backgroundColor: '#1c2526' }}
            >
              Зберегти
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          onClick={() => navigate('/add-vacancy')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#1c2526',
            '&:hover': {
              backgroundColor: '#2c3537'
            }
          }}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
};

export default EmployerDashboard;