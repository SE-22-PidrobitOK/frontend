import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Fade,
  ClickAwayListener
} from '@mui/material';
import {
  Search,
  Clear,
  TrendingUp,
  Work,
  Business,
  Code
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const VacancySearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Popular searches and suggestions
  const popularSearches = [
    'React Developer',
    'Python Developer', 
    'Frontend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Mobile Developer'
  ];

  const mockSuggestions = {
    positions: [
      'Senior Frontend Developer',
      'Full Stack JavaScript Developer',
      'Backend Developer Python',
      'DevOps Engineer',
      'Mobile Developer React Native',
      'UI/UX Designer',
      'Product Manager',
      'QA Engineer'
    ],
    companies: [
      'TechCorp',
      'StartupHub',
      'DataSolutions',
      'CloudTech',
      'MobileFirst',
      'FinTechPro',
      'GameDev Studio'
    ],
    technologies: [
      'React',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Python',
      'Django',
      'AWS',
      'Docker',
      'Kubernetes',
      'MongoDB',
      'PostgreSQL'
    ]
  };

  // Filter suggestions based on search input
  useEffect(() => {
    if (searchValue.length > 0) {
      const query = searchValue.toLowerCase();
      const filtered = [];

      // Add matching positions
      mockSuggestions.positions
        .filter(pos => pos.toLowerCase().includes(query))
        .slice(0, 3)
        .forEach(pos => {
          filtered.push({
            type: 'position',
            text: pos,
            icon: Work
          });
        });

      // Add matching companies
      mockSuggestions.companies
        .filter(company => company.toLowerCase().includes(query))
        .slice(0, 2)
        .forEach(company => {
          filtered.push({
            type: 'company',
            text: company,
            icon: Business
          });
        });

      // Add matching technologies
      mockSuggestions.technologies
        .filter(tech => tech.toLowerCase().includes(query))
        .slice(0, 3)
        .forEach(tech => {
          filtered.push({
            type: 'technology',
            text: tech,
            icon: Code
          });
        });

      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    
    // Show suggestions when typing
    if (value.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearch = (query = searchValue) => {
    if (onSearch) {
      onSearch(query);
    }
    setShowSuggestions(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.text);
    handleSearch(suggestion.text);
  };

  const handlePopularSearchClick = (search) => {
    setSearchValue(search);
    handleSearch(search);
  };

  const handleClear = () => {
    setSearchValue('');
    handleSearch('');
    setShowSuggestions(false);
  };

  const handleClickAway = () => {
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (searchValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'position':
        return 'Посада';
      case 'company':
        return 'Компанія';
      case 'technology':
        return 'Технологія';
      default:
        return '';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'position':
        return '#1976d2';
      case 'company':
        return '#388e3c';
      case 'technology':
        return '#f57c00';
      default:
        return '#666';
    }
  };

  return (
    <Box sx={{ position: 'relative', maxWidth: 800, width: '100%' }}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Наприклад: Front-end engineer"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#666' }} />
                </InputAdornment>
              ),
              endAdornment: searchValue && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{ color: '#666' }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'white',
                borderRadius: 2,
                fontSize: '1.1rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                  borderWidth: 2,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1c2526',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1c2526',
                  borderWidth: 2,
                },
                '& input': {
                  fontFamily: 'Rubik',
                  fontSize: '1.1rem',
                  py: 2
                }
              }
            }}
          />

          {/* Search Suggestions */}
          <Fade in={showSuggestions && (suggestions.length > 0 || searchValue.length === 0)}>
            <Paper
              elevation={8}
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                mt: 1,
                zIndex: 1000,
                maxHeight: 400,
                overflow: 'auto',
                borderRadius: 2,
                border: '1px solid #e0e0e0'
              }}
            >
              {searchValue.length === 0 ? (
                // Popular searches when no input
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ color: '#666', mr: 1, fontSize: '1.2rem' }} />
                    <Typography 
                      variant="subtitle2" 
                      fontFamily="Rubik" 
                      fontWeight={600}
                      color="#666"
                    >
                      Популярні пошуки
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {popularSearches.map((search) => (
                      <Chip
                        key={search}
                        label={search}
                        size="small"
                        clickable
                        onClick={() => handlePopularSearchClick(search)}
                        sx={{
                          backgroundColor: '#f5f5f5',
                          color: '#666',
                          fontFamily: 'Rubik',
                          fontSize: '0.8rem',
                          '&:hover': {
                            backgroundColor: '#1c2526',
                            color: 'white'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ) : (
                // Search suggestions
                <List sx={{ p: 0 }}>
                  {suggestions.map((suggestion, index) => {
                    const IconComponent = suggestion.icon;
                    return (
                      <ListItem
                        key={`${suggestion.type}-${index}`}
                        button
                        onClick={() => handleSuggestionClick(suggestion)}
                        sx={{
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          },
                          borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <IconComponent 
                            sx={{ 
                              color: getTypeColor(suggestion.type),
                              fontSize: '1.2rem'
                            }} 
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography 
                                variant="body2" 
                                fontFamily="Rubik"
                                sx={{ flex: 1 }}
                              >
                                {suggestion.text}
                              </Typography>
                              <Chip
                                label={getTypeLabel(suggestion.type)}
                                size="small"
                                sx={{
                                  backgroundColor: getTypeColor(suggestion.type),
                                  color: 'white',
                                  fontSize: '0.65rem',
                                  height: 18,
                                  fontFamily: 'Rubik'
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
                  
                  {suggestions.length === 0 && (
                    <ListItem sx={{ py: 2 }}>
                      <ListItemText
                        primary={
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            fontFamily="Rubik"
                            sx={{ textAlign: 'center' }}
                          >
                            Нічого не знайдено
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  
                  {/* Show current search as option */}
                  <ListItem
                    button
                    onClick={() => handleSearch()}
                    sx={{
                      py: 1.5,
                      backgroundColor: '#f8f9fa',
                      '&:hover': {
                        backgroundColor: '#e9ecef'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Search sx={{ color: '#1c2526', fontSize: '1.2rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body2" 
                          fontFamily="Rubik"
                          fontWeight={500}
                        >
                          Шукати "{searchValue}"
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              )}
            </Paper>
          </Fade>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

VacancySearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default VacancySearch;