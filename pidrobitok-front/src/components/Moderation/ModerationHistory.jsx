import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Pagination
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Warning,
  Block,
  Flag,
  History,
  Search,
  FilterList,
  Visibility,
  Edit,
  Delete,
  Person,
  BusinessCenter,
  Assignment,
  Gavel,
  CalendarToday,
  AdminPanelSettings
} from '@mui/icons-material';

const ModerationHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    actionType: 'all',
    targetType: 'all',
    moderator: 'all',
    dateRange: 'all'
  });
  const [selectedAction, setSelectedAction] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Mock data for moderation history
  useEffect(() => {
    const mockHistory = [
      {
        id: 1,
        action: 'approve',
        targetType: 'vacancy',
        targetId: 1,
        targetTitle: 'Senior Frontend Developer',
        moderator: {
          id: 1,
          name: 'Admin User',
          email: 'admin@pidrobitok.com'
        },
        reason: 'Вакансія відповідає всім вимогам платформи',
        timestamp: '2024-01-15T14:30:00Z',
        details: {
          company: 'TechCorp Solutions',
          employer: 'John Doe',
          salary: '3000-5000 USD',
          location: 'Київ'
        }
      },
      {
        id: 2,
        action: 'reject',
        targetType: 'vacancy',
        targetId: 2,
        targetTitle: 'Backend Developer',
        moderator: {
          id: 1,
          name: 'Admin User',
          email: 'admin@pidrobitok.com'
        },
        reason: 'Порушення правил: занадто низька зарплата для вказаного досвіду',
        timestamp: '2024-01-15T13:45:00Z',
        details: {
          company: 'StartupHub',
          employer: 'Jane Smith',
          salary: '800-1200 USD',
          location: 'Львів'
        }
      },
      {
        id: 3,
        action: 'block',
        targetType: 'user',
        targetId: 5,
        targetTitle: 'user@example.com',
        moderator: {
          id: 1,
          name: 'Admin User',
          email: 'admin@pidrobitok.com'
        },
        reason: 'Порушення правил спілкування: надсилання неподобаючих повідомлень',
        timestamp: '2024-01-15T12:20:00Z',
        details: {
          userRole: 'student',
          violations: 3,
          lastActivity: '2024-01-14T16:30:00Z'
        }
      },
      {
        id: 4,
        action: 'resolve',
        targetType: 'complaint',
        targetId: 1,
        targetTitle: 'Скарга на вакансію',
        moderator: {
          id: 1,
          name: 'Admin User',
          email: 'admin@pidrobitok.com'
        },
        reason: 'Скарга визнана обґрунтованою, вакансія видалена',
        timestamp: '2024-01-15T11:15:00Z',
        details: {
          complaintType: 'spam',
          reporter: 'Alex Brown',
          evidence: ['screenshot1.jpg', 'screenshot2.jpg']
        }
      },
      {
        id: 5,
        action: 'warn',
        targetType: 'user',
        targetId: 3,
        targetTitle: 'mike@designstudio.com',
        moderator: {
          id: 1,
          name: 'Admin User',
          email: 'admin@pidrobitok.com'
        },
        reason: 'Попередження за порушення правил публікації вакансій',
        timestamp: '2024-01-15T10:00:00Z',
        details: {
          userRole: 'employer',
          violations: 1,
          lastActivity: '2024-01-15T09:20:00Z'
        }
      }
    ];

    setHistory(mockHistory);
    setFilteredHistory(mockHistory);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...history];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.moderator.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.actionType !== 'all') {
      filtered = filtered.filter(item => item.action === filters.actionType);
    }
    
    if (filters.targetType !== 'all') {
      filtered = filtered.filter(item => item.targetType === filters.targetType);
    }
    
    if (filters.moderator !== 'all') {
      filtered = filtered.filter(item => item.moderator.id.toString() === filters.moderator);
    }
    
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const itemDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filtered = filtered.filter(item => {
            itemDate.setTime(new Date(item.timestamp).getTime());
            return itemDate.toDateString() === now.toDateString();
          });
          break;
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(item => new Date(item.timestamp) >= weekAgo);
          break;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(item => new Date(item.timestamp) >= monthAgo);
          break;
        default:
          break;
      }
    }
    
    setFilteredHistory(filtered);
    setCurrentPage(1);
  }, [history, searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setDetailDialogOpen(true);
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'approve': return <CheckCircle />;
      case 'reject': return <Cancel />;
      case 'warn': return <Warning />;
      case 'block': return <Block />;
      case 'resolve': return <Flag />;
      default: return <Gavel />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approve': return '#2e7d32';
      case 'reject': return '#d32f2f';
      case 'warn': return '#ed6c02';
      case 'block': return '#d32f2f';
      case 'resolve': return '#1976d2';
      default: return '#666';
    }
  };

  const getTargetTypeIcon = (targetType) => {
    switch (targetType) {
      case 'vacancy': return <Assignment />;
      case 'user': return <Person />;
      case 'complaint': return <Flag />;
      default: return <Gavel />;
    }
  };

  const getTargetTypeLabel = (targetType) => {
    switch (targetType) {
      case 'vacancy': return 'Вакансія';
      case 'user': return 'Користувач';
      case 'complaint': return 'Скарга';
      default: return 'Інше';
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case 'approve': return 'Схвалено';
      case 'reject': return 'Відхилено';
      case 'warn': return 'Попередження';
      case 'block': return 'Заблоковано';
      case 'resolve': return 'Вирішено';
      default: return 'Дія';
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const currentHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
              Історія модерації
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Журнал всіх дій модераторів на платформі
            </Typography>
          </Box>
        </Box>

        {/* Search and Filters */}
        <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Пошук по назві, причині або модератору..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: '#666' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Тип дії</InputLabel>
                <Select
                  value={filters.actionType}
                  onChange={(e) => handleFilterChange('actionType', e.target.value)}
                  label="Тип дії"
                >
                  <MenuItem value="all">Всі дії</MenuItem>
                  <MenuItem value="approve">Схвалення</MenuItem>
                  <MenuItem value="reject">Відхилення</MenuItem>
                  <MenuItem value="warn">Попередження</MenuItem>
                  <MenuItem value="block">Блокування</MenuItem>
                  <MenuItem value="resolve">Вирішення</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Тип об'єкта</InputLabel>
                <Select
                  value={filters.targetType}
                  onChange={(e) => handleFilterChange('targetType', e.target.value)}
                  label="Тип об'єкта"
                >
                  <MenuItem value="all">Всі об'єкти</MenuItem>
                  <MenuItem value="vacancy">Вакансії</MenuItem>
                  <MenuItem value="user">Користувачі</MenuItem>
                  <MenuItem value="complaint">Скарги</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Період</InputLabel>
                <Select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  label="Період"
                >
                  <MenuItem value="all">Весь час</MenuItem>
                  <MenuItem value="today">Сьогодні</MenuItem>
                  <MenuItem value="week">Тиждень</MenuItem>
                  <MenuItem value="month">Місяць</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Знайдено {filteredHistory.length} записів
        </Typography>

        {/* Timeline */}
        {currentHistory.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <History sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Записи не знайдено
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Спробуйте змінити параметри пошуку або фільтри
            </Typography>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            {currentHistory.map((item, index) => (
              <Card 
                key={item.id}
                sx={{ 
                  borderRadius: 2, 
                  cursor: 'pointer',
                  '&:hover': { 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease',
                  mb: index < currentHistory.length - 1 ? 2 : 0
                }}
                onClick={() => handleActionClick(item)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Avatar 
                        sx={{ 
                          backgroundColor: getActionColor(item.action),
                          width: 40,
                          height: 40
                        }}
                      >
                        {getActionIcon(item.action)}
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Chip
                            label={getActionLabel(item.action)}
                            size="small"
                            sx={{ 
                              backgroundColor: getActionColor(item.action) + '20',
                              color: getActionColor(item.action)
                            }}
                          />
                          <Chip
                            label={getTargetTypeLabel(item.targetType)}
                            size="small"
                            icon={getTargetTypeIcon(item.targetType)}
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography variant="h6" fontFamily="Rubik" fontWeight={600} sx={{ mb: 1 }}>
                          {item.targetTitle}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Модератор: {item.moderator.name}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {item.reason}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(item.timestamp).toLocaleDateString('uk-UA')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(item.timestamp).toLocaleTimeString('uk-UA')}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: 'Rubik'
                }
              }}
            />
          </Box>
        )}

        {/* Detail Dialog */}
        <Dialog 
          open={detailDialogOpen} 
          onClose={() => setDetailDialogOpen(false)} 
          maxWidth="md" 
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getActionIcon(selectedAction?.action)}
              <Typography variant="h6">
                Деталі дії модерації
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedAction && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                      Основна інформація
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body2">
                        <strong>Дія:</strong> {getActionLabel(selectedAction.action)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Об'єкт:</strong> {getTargetTypeLabel(selectedAction.targetType)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Назва:</strong> {selectedAction.targetTitle}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Модератор:</strong> {selectedAction.moderator.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Дата:</strong> {new Date(selectedAction.timestamp).toLocaleString('uk-UA')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                      Причина
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {selectedAction.reason}
                    </Typography>
                    
                    {selectedAction.details && (
                      <>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                          Додаткові деталі
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {Object.entries(selectedAction.details).map(([key, value]) => (
                            <Typography key={key} variant="body2">
                              <strong>{key}:</strong> {value}
                            </Typography>
                          ))}
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailDialogOpen(false)}>
              Закрити
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ModerationHistory; 