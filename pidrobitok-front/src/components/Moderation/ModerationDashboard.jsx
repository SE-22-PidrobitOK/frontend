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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Grid,
  Paper,
  Tabs,
  Tab,
  List
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Visibility,
  People,
  CheckCircle,
  Cancel,
  Warning,
  Flag,
  Block,
  History,
  FilterList,
  Assignment,
  Gavel
} from '@mui/icons-material';

const ModerationDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [vacancies, setVacancies] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    pendingVacancies: 0,
    totalComplaints: 0,
    blockedUsers: 0,
    resolvedToday: 0
  });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [alert, setAlert] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    dateRange: 'all'
  });

  // Mock data for pending vacancies
  useEffect(() => {
    const mockVacancies = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp Solutions",
        employer: {
          id: 1,
          name: "John Doe",
          email: "john@techcorp.com",
          companyName: "TechCorp Solutions"
        },
        location: "Київ",
        salary: "3000-5000 USD",
        experience: "3-5 років",
        employmentType: "Повна зайнятість",
        tags: ["React", "TypeScript", "Node.js", "Git"],
        description: "Шукаємо досвідченого Frontend розробника для роботи над інноваційними проектами...",
        postedDate: "2024-01-15T10:30:00Z",
        status: "pending",
        priority: "high",
        flaggedWords: ["urgent", "immediate"],
        companyLogo: "/api/placeholder/48/48"
      },
      {
        id: 2,
        title: "Backend Developer",
        company: "StartupHub",
        employer: {
          id: 2,
          name: "Jane Smith",
          email: "jane@startuphub.com",
          companyName: "StartupHub"
        },
        location: "Львів",
        salary: "2500-4000 USD",
        experience: "1-3 роки",
        employmentType: "Повна зайнятість",
        tags: ["Python", "Django", "PostgreSQL", "Docker"],
        description: "Потрібен Backend розробник для створення надійних серверних рішень...",
        postedDate: "2024-01-14T15:45:00Z",
        status: "pending",
        priority: "medium",
        flaggedWords: [],
        companyLogo: "/api/placeholder/48/48"
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "DesignStudio",
        employer: {
          id: 3,
          name: "Mike Johnson",
          email: "mike@designstudio.com",
          companyName: "DesignStudio"
        },
        location: "Дніпро",
        salary: "2000-3500 USD",
        experience: "1-3 роки",
        employmentType: "Повна зайнятість",
        tags: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        description: "Шукаємо креативного дизайнера для створення чудових користувацьких інтерфейсів...",
        postedDate: "2024-01-13T09:20:00Z",
        status: "pending",
        priority: "low",
        flaggedWords: [],
        companyLogo: "/api/placeholder/48/48"
      }
    ];

    const mockComplaints = [
      {
        id: 1,
        type: "vacancy",
        targetId: 1,
        targetTitle: "Senior Frontend Developer",
        reporter: {
          id: 101,
          name: "Alex Brown",
          email: "alex@email.com"
        },
        reason: "spam",
        description: "Ця вакансія виглядає як спам, дуже підозріла компанія",
        status: "pending",
        priority: "high",
        createdAt: "2024-01-15T12:00:00Z",
        evidence: ["screenshot1.jpg", "screenshot2.jpg"]
      },
      {
        id: 2,
        type: "user",
        targetId: 5,
        targetTitle: "user@example.com",
        reporter: {
          id: 102,
          name: "Sarah Wilson",
          email: "sarah@email.com"
        },
        reason: "harassment",
        description: "Користувач надсилає неподобаючі повідомлення",
        status: "investigating",
        priority: "high",
        createdAt: "2024-01-14T16:30:00Z",
        evidence: ["chat_log.txt"]
      }
    ];

    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@techcorp.com",
        role: "employer",
        status: "active",
        violations: 0,
        lastActivity: "2024-01-15T10:30:00Z",
        registeredDate: "2023-06-15T00:00:00Z"
      },
      {
        id: 5,
        name: "user@example.com",
        email: "user@example.com",
        role: "student",
        status: "warning",
        violations: 2,
        lastActivity: "2024-01-14T16:30:00Z",
        registeredDate: "2023-12-01T00:00:00Z"
      }
    ];

    setVacancies(mockVacancies);
    setComplaints(mockComplaints);
    setUsers(mockUsers);
    
    // Calculate stats
    setStats({
      pendingVacancies: mockVacancies.length,
      totalComplaints: mockComplaints.length,
      blockedUsers: mockUsers.filter(u => u.status === 'blocked').length,
      resolvedToday: 5 // Mock data
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event, item, type) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedItem({ ...item, type });
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedItem(null);
  };

  const handleAction = (action) => {
    setActionType(action);
    setActionDialogOpen(true);
    handleMenuClose();
  };

  const handleActionConfirm = async () => {
    try {
      if (selectedItem.type === 'vacancy') {
        if (actionType === 'approve') {
          const updatedVacancies = vacancies.map(v => 
            v.id === selectedItem.id ? { ...v, status: 'approved' } : v
          );
          setVacancies(updatedVacancies);
        } else if (actionType === 'reject') {
          const updatedVacancies = vacancies.map(v => 
            v.id === selectedItem.id ? { ...v, status: 'rejected' } : v
          );
          setVacancies(updatedVacancies);
        }
      } else if (selectedItem.type === 'complaint') {
        const updatedComplaints = complaints.map(c => 
          c.id === selectedItem.id ? { ...c, status: 'resolved' } : c
        );
        setComplaints(updatedComplaints);
      } else if (selectedItem.type === 'user') {
        const updatedUsers = users.map(u => 
          u.id === selectedItem.id ? { ...u, status: actionType === 'block' ? 'blocked' : 'warning' } : u
        );
        setUsers(updatedUsers);
      }

      setAlert({
        type: 'success',
        message: `Дія "${actionType}" успішно виконана`
      });
      setActionDialogOpen(false);
      setSelectedItem(null);
      setActionReason('');
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Помилка при виконанні дії'
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#d32f2f';
      case 'medium': return '#ed6c02';
      case 'low': return '#2e7d32';
      default: return '#666';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ed6c02';
      case 'approved': return '#2e7d32';
      case 'rejected': return '#d32f2f';
      case 'investigating': return '#1976d2';
      case 'resolved': return '#2e7d32';
      default: return '#666';
    }
  };

  const StatsCard = ({ icon, title, value, color, subtitle }) => (
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
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );

  const VacancyCard = ({ vacancy }) => (
    <Card sx={{ 
      borderRadius: 3, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      mb: 2
    }}>
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
                  label={vacancy.status === 'pending' ? 'На розгляді' : vacancy.status}
                  size="small"
                  sx={{ 
                    backgroundColor: getStatusColor(vacancy.status) + '20',
                    color: getStatusColor(vacancy.status)
                  }}
                />
                <Chip
                  label={vacancy.priority}
                  size="small"
                  sx={{ 
                    backgroundColor: getPriorityColor(vacancy.priority) + '20',
                    color: getPriorityColor(vacancy.priority)
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {vacancy.company} • {vacancy.location} • {vacancy.salary}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {vacancy.description.substring(0, 150)}...
              </Typography>

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
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: '#666' }}>
                <Typography variant="caption">
                  Роботодавець: {vacancy.employer.name}
                </Typography>
                <Typography variant="caption">
                  {new Date(vacancy.postedDate).toLocaleDateString('uk-UA')}
                </Typography>
                {vacancy.flaggedWords.length > 0 && (
                  <Chip
                    label={`${vacancy.flaggedWords.length} підозрілих слів`}
                    size="small"
                    color="warning"
                    icon={<Warning />}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<CheckCircle />}
              onClick={() => handleAction('approve')}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': { backgroundColor: '#1b5e20' }
              }}
            >
                <Typography variant="body2" fontWeight={600} fontFamily="Rubik">
                    Схвалити
                </Typography>
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Cancel />}
              onClick={() => handleAction('reject')}
              sx={{
                borderColor: '#d32f2f',
                color: '#d32f2f',
                '&:hover': { 
                  backgroundColor: '#d32f2f',
                  color: 'white'
                }
              }}
            >
                <Typography variant="body2" fontWeight={600} fontFamily="Rubik">
                    Відхилити
                </Typography>
            </Button>
            <IconButton
              onClick={(e) => handleMenuOpen(e, vacancy, 'vacancy')}
              sx={{ color: '#666' }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const ComplaintCard = ({ complaint }) => (
    <Card sx={{ 
      borderRadius: 3, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      mb: 2
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography
                variant="h6"
                fontFamily="Rubik"
                fontWeight={600}
                sx={{ color: '#1c2526' }}
              >
                Скарга на {complaint.type === 'vacancy' ? 'вакансію' : 'користувача'}
              </Typography>
              <Chip
                label={complaint.status}
                size="small"
                sx={{ 
                  backgroundColor: getStatusColor(complaint.status) + '20',
                  color: getStatusColor(complaint.status)
                }}
              />
              <Chip
                label={complaint.priority}
                size="small"
                sx={{ 
                  backgroundColor: getPriorityColor(complaint.priority) + '20',
                  color: getPriorityColor(complaint.priority)
                }}
              />
            </Box>

            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              {complaint.targetTitle}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Причина: {complaint.reason} • Від: {complaint.reporter.name}
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              {complaint.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: '#666' }}>
              <Typography variant="caption">
                {new Date(complaint.createdAt).toLocaleDateString('uk-UA')}
              </Typography>
              {complaint.evidence.length > 0 && (
                <Typography variant="caption">
                  Докази: {complaint.evidence.length} файл(ів)
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<CheckCircle />}
              onClick={() => handleAction('resolve')}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': { backgroundColor: '#1b5e20' }
              }}
            >
                <Typography variant="body2" fontWeight={600} fontFamily="Rubik">
                    Вирішити
                </Typography>
            </Button>
            <IconButton
              onClick={(e) => handleMenuOpen(e, complaint, 'complaint')}
              sx={{ color: '#666' }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
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
              Панель модерації
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Керування контентом, скаргами та користувачами
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<History />}
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
              Історія дій
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
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
              Фільтри
            </Button>
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
              icon={<Assignment />}
              title="Вакансій на розгляді"
              value={stats.pendingVacancies}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Flag />}
              title="Активних скарг"
              value={stats.totalComplaints}
              color="#d32f2f"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<Block />}
              title="Заблокованих користувачів"
              value={stats.blockedUsers}
              color="#666"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              icon={<CheckCircle />}
              title="Вирішено сьогодні"
              value={stats.resolvedToday}
              color="#2e7d32"
            />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 3, mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                fontFamily: 'Rubik',
                fontWeight: 500,
                color: '#666',
                '&.Mui-selected': {
                  color: '#1c2526',
                  fontWeight: 600
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1c2526'
              }
            }}
          >
            <Tab 
              icon={<Assignment />} 
              label={`Вакансії (${vacancies.length})`} 
              iconPosition="start"
            />
            <Tab 
              icon={<Flag />} 
              label={`Скарги (${complaints.length})`} 
              iconPosition="start"
            />
            <Tab 
              icon={<People />} 
              label={`Користувачі (${users.length})`} 
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Box>
            <Typography 
              variant="h5" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ mb: 3, color: '#1c2526' }}
            >
              Вакансії на модерації
            </Typography>
            
            {vacancies.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <Assignment sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Немає вакансій для модерації
                </Typography>
              </Paper>
            ) : (
              <Box>
                {vacancies.map(vacancy => (
                  <VacancyCard key={vacancy.id} vacancy={vacancy} />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography 
              variant="h5" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ mb: 3, color: '#1c2526' }}
            >
              Скарги користувачів
            </Typography>
            
            {complaints.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                <Flag sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Немає активних скарг
                </Typography>
              </Paper>
            ) : (
              <Box>
                {complaints.map(complaint => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))}
              </Box>
            )}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography 
              variant="h5" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ mb: 3, color: '#1c2526' }}
            >
              Керування користувачами
            </Typography>
            
            <List>
              {users.map(user => (
                <Card key={user.id} sx={{ mb: 2, borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ backgroundColor: user.status === 'blocked' ? '#d32f2f' : '#1976d2' }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontFamily="Rubik" fontWeight={600}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email} • {user.role}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                            <Chip
                              label={user.status}
                              size="small"
                              sx={{ 
                                backgroundColor: getStatusColor(user.status) + '20',
                                color: getStatusColor(user.status)
                              }}
                            />
                            {user.violations > 0 && (
                              <Chip
                                label={`${user.violations} порушень`}
                                size="small"
                                color="warning"
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Warning />}
                          onClick={() => handleAction('warn')}
                          sx={{
                            borderColor: '#ed6c02',
                            color: '#ed6c02',
                            '&:hover': { 
                              backgroundColor: '#ed6c02',
                              color: 'white'
                            }
                          }}
                        >
                          <Typography variant="body2" fontWeight={600} fontFamily="Rubik">
                            Попередження
                          </Typography>
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Block />}
                          onClick={() => handleAction('block')}
                          sx={{
                            borderColor: '#d32f2f',
                            color: '#d32f2f',
                            '&:hover': { 
                              backgroundColor: '#d32f2f',
                              color: 'white'
                            }
                          }}
                        >
                          <Typography variant="body2" fontWeight={600} fontFamily="Rubik">
                            Заблокувати
                          </Typography>
                        </Button>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, user, 'user')}
                          sx={{ color: '#666' }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          {selectedItem?.type === 'vacancy' && (
            <>
              <MenuItem onClick={() => handleAction('approve')}>
                <CheckCircle />
                <Typography sx={{ ml: 1 }}>Схвалити</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleAction('reject')}>
                <Cancel />
                <Typography sx={{ ml: 1 }}>Відхилити</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleAction('edit')}>
                <Edit />
                <Typography sx={{ ml: 1 }}>Редагувати</Typography>
              </MenuItem>
            </>
          )}
          {selectedItem?.type === 'complaint' && (
            <>
              <MenuItem onClick={() => handleAction('resolve')}>
                <CheckCircle />
                <Typography sx={{ ml: 1 }}>Позначити як вирішену</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleAction('investigate')}>
                <Visibility />
                <Typography sx={{ ml: 1 }}>Розслідувати</Typography>
              </MenuItem>
            </>
          )}
          {selectedItem?.type === 'user' && (
            <>
              <MenuItem onClick={() => handleAction('warn')}>
                <Warning />
                <Typography sx={{ ml: 1 }}>Попередження</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleAction('block')}>
                <Block />
                <Typography sx={{ ml: 1 }}>Заблокувати</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleAction('unblock')}>
                <PlayArrow />
                <Typography sx={{ ml: 1 }}>Розблокувати</Typography>
              </MenuItem>
            </>
          )}
        </Menu>

        {/* Action Dialog */}
        <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {actionType === 'approve' && 'Схвалення вакансії'}
            {actionType === 'reject' && 'Відхилення вакансії'}
            {actionType === 'resolve' && 'Вирішення скарги'}
            {actionType === 'block' && 'Блокування користувача'}
            {actionType === 'warn' && 'Попередження користувача'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Причина (обов'язково)"
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Вкажіть причину для цієї дії..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setActionDialogOpen(false)}>
              Скасувати
            </Button>
            <Button 
              onClick={handleActionConfirm} 
              variant="contained"
              disabled={!actionReason.trim()}
              sx={{ backgroundColor: '#1c2526' }}
            >
              Підтвердити
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ModerationDashboard; 