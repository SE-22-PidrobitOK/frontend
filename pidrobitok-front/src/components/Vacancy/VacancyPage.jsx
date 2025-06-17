import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Pagination,
  Chip,
  Button,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import VacancyCard from './VacancyCard';
import VacancyFilters from './VacancyFilters';
import VacancySearch from './VacancySearch';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';

// Mock data for demonstration
const mockVacancies = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Київ",
    salary: "$3000-5000",
    experience: "3",
    tags: ["React", "TypeScript", "Next.js"],
    description: "Шукаємо досвідченого Frontend розробника для створення сучасних веб-додатків...",
    postedDate: "2 дні тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 2,
    title: "Full Stack JavaScript Developer",
    company: "StartupHub",
    location: "Львів / Remote",
    salary: "$2500-4000",
    experience: "0",
    tags: ["Node.js", "React", "MongoDB"],
    description: "Приєднуйся до нашої команди і розвивай інноваційні продукти...",
    postedDate: "1 день тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 3,
    title: "Backend Developer Python",
    company: "DataSolutions",
    location: "Харків",
    salary: "$2800-4500",
    experience: "3",
    tags: ["Python", "Django", "PostgreSQL"],
    description: "Розробка та підтримка серверної частини високонавантажених систем...",
    postedDate: "3 дні тому",
    isRemote: false,
    companyLogo: null
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 5,
    title: "Mobile Developer React Native",
    company: "MobileFirst",
    location: "Балаклія",
    salary: "$2200-3800",
    experience: "2",
    tags: ["React Native", "JavaScript", "iOS", "Android"],
    description: "Розробка мобільних додатків для iOS та Android платформ...",
    postedDate: "5 днів тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 6,
    title: "Test",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 8,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 10,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 11,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
  {
    id: 12,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Київ",
    salary: "$3500-6000",
    experience: "4",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Шукаємо DevOps інженера для автоматизації процесів розгортання...",
    postedDate: "1 тиждень тому",
    isRemote: true,
    companyLogo: null
  },
];

const VacancyPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [vacancies, setVacancies] = useState(mockVacancies);
  const [filteredVacancies, setFilteredVacancies] = useState(mockVacancies);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    location: [],
    experience: [],
    salary: [],
    tags: [],
    remote: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  const vacanciesPerPage = 10;
  const totalPages = Math.ceil(filteredVacancies.length / vacanciesPerPage);
  
  const currentVacancies = filteredVacancies.slice(
    (currentPage - 1) * vacanciesPerPage,
    currentPage * vacanciesPerPage
  );

  // Popular job categories (like on Djinni)
  const jobCategories = [
    'JavaScript / Front-end',
    'Java',
    'C# / .NET',
    'Python',
    'PHP',
    'Node.js',
    'iOS',
    'Android',
    'React Native',
    'Flutter',
    'Golang',
    'Ruby',
    'Scala',
    'Salesforce',
    'Rust',
    'Elixir',
    'Kotlin',
    'ERP Systems',
    'No Code'
  ];

  // Filter and search logic
  useEffect(() => {
    let filtered = [...vacancies];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(vacancy =>
        vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply filters
    if (activeFilters.location.length > 0) {
      filtered = filtered.filter(vacancy =>
        activeFilters.location.some(loc => vacancy.location.includes(loc))
      );
    }
    
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(vacancy =>
        activeFilters.tags.some(tag => vacancy.tags.includes(tag))
      );
    }
    
    if (activeFilters.remote) {
      filtered = filtered.filter(vacancy => vacancy.isRemote);
    }

    if (activeFilters.experience.length > 0) {
      filtered = filtered.filter(vacancy =>
        activeFilters.experience.some(expr => vacancy.experience.includes(expr))
      )
    }
    
    setFilteredVacancies(filtered);
    setCurrentPage(1);
  }, [vacancies, activeFilters, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearActiveFilters = () => {
    setActiveFilters({
      location: [],
      experience: [],
      salary: [],
      tags: [],
      remote: false
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filter) => {
      if (Array.isArray(filter)) {
        return count + filter.length;
      }
      return count + (filter ? 1 : 0);
    }, 0) + (searchQuery ? 1 : 0);
  };

  const handleCategoryClick = (category) => {
    setActiveFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(category) 
        ? prev.tags.filter(t => t !== category)
        : [...prev.tags, category]
    }));
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      
      
      {/* Main Content */}
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        flex: 1,
        pt: 3,
        pb: 5
      }}>
        <Container maxWidth="lg">
          {/* Header with Title and Count */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ mb: 1, color: '#1c2526' }}
            >
              Вакансії {filteredVacancies.length > 0 && filteredVacancies.length}
            </Typography>
          </Box>

          {/* Search Bar - Centered */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 4
          }}>
            <VacancySearch onSearch={handleSearch} />
          </Box>

          {/* Job Categories - Horizontal scrollable chips */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              fontFamily="Rubik" 
              fontWeight={600}
              sx={{ mb: 2, color: '#1c2526' }}
            >
              Категорія
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap',
              mb: 2
            }}>
              {jobCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable
                  onClick={() => handleCategoryClick(category)}
                  variant={activeFilters.tags.includes(category) ? 'filled' : 'outlined'}
                  sx={{
                    borderColor: activeFilters.tags.includes(category) ? '#1c2526' : '#e0e0e0',
                    backgroundColor: activeFilters.tags.includes(category) ? '#1c2526' : 'white',
                    color: activeFilters.tags.includes(category) ? 'white' : '#666',
                    fontFamily: 'Rubik',
                    '&:hover': {
                      backgroundColor: activeFilters.tags.includes(category) ? '#2c3537' : '#f5f5f5',
                      borderColor: activeFilters.tags.includes(category) ? '#2c3537' : '#ccc'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Filters Button and Active Filters Row */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            mb: 3,
            flexWrap: 'wrap'
          }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFiltersOpen(true)}
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
              Розширений пошук {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>
            
            {getActiveFilterCount() > 0 && (
              <Button
                variant="text"
                size="small"
                onClick={clearActiveFilters}
                sx={{ color: '#666', fontFamily: 'Rubik' }}
              >
                Очистити все
              </Button>
            )}

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {activeFilters.location.map(location => (
                  <Chip
                    key={location}
                    label={location}
                    onDelete={() => {
                      setActiveFilters(prev => ({
                        ...prev,
                        location: prev.location.filter(l => l !== location)
                      }));
                    }}
                    size="small"
                  />
                ))}
                {activeFilters.remote && (
                  <Chip
                    label="Віддалена робота"
                    onDelete={() => {
                      setActiveFilters(prev => ({
                        ...prev,
                        remote: false
                      }));
                    }}
                    size="small"
                  />
                )}
                {searchQuery && (
                  <Chip
                    label={`Пошук: ${searchQuery}`}
                    onDelete={() => setSearchQuery('')}
                    size="small"
                  />
                )}
              </Box>
            )}
          </Box>

          {/* Results Count */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Знайдено {filteredVacancies.length} вакансій
          </Typography>

          {/* Vacancy List - Single Column */}
          <Box sx={{ mb: 4 }}>
            {currentVacancies.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {currentVacancies.map(vacancy => (
                  <VacancyCard key={vacancy.id} vacancy={vacancy} />
                ))}
              </Box>
            ) : (
              <Box sx={{ 
                textAlign: 'center', 
                py: 8,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Вакансії не знайдено
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Спробуйте змінити параметри пошуку або фільтри
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={clearActiveFilters}
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
                  Очистити фільтри
                </Button>
              </Box>
            )}
          </Box>

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

          {/* Filters Drawer */}
          <Drawer
            anchor="right"
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: isMobile ? '100%' : 400,
                maxWidth: '100vw'
              }
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" fontFamily="Rubik" sx={{ mb: 2 }}>
                Розширений пошук
              </Typography>
              <VacancyFilters 
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
                mobile={true}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setFiltersOpen(false)}
                  sx={{
                    backgroundColor: '#1c2526',
                    fontFamily: 'Rubik',
                    '&:hover': {
                      backgroundColor: '#2c3537'
                    }
                  }}
                >
                  Застосувати
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    clearActiveFilters();
                    setFiltersOpen(false);
                  }}
                  sx={{
                    borderColor: '#1c2526',
                    color: '#1c2526',
                    fontFamily: 'Rubik'
                  }}
                >
                  Очистити
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Container>
      </Box>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default VacancyPage;