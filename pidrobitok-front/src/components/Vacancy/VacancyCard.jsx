import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LocationOn,
  Work,
  AttachMoney,
  Schedule,
  Bookmark,
  BookmarkBorder,
  Share
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const VacancyCard = ({ vacancy, onSave, onShare, isSaved = false }) => {
  const navigate = useNavigate();
  
  const {
    id,
    title,
    company,
    location,
    salary,
    experience,
    tags,
    description,
    postedDate,
    isRemote,
    companyLogo
  } = vacancy;

  const handleSave = (e) => {
    e.stopPropagation();
    if (onSave) {
      onSave(id);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(vacancy);
    }
  };

  const handleCardClick = () => {
    navigate(`/vacancy/${id}`);
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    // Перенаправляємо на сторінку деталей з автовідкриттям модалки
    navigate(`/vacancy/${id}?apply=true`);
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
          borderColor: '#e0e0e0'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Avatar
              src={companyLogo}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: '#f5f5f5',
                color: '#666',
                fontWeight: 600,
                fontSize: '1.2rem'
              }}
            >
              {company.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                fontFamily="Rubik"
                fontWeight={600}
                sx={{
                  color: '#1c2526',
                  mb: 0.5,
                  lineHeight: 1.3,
                  '&:hover': {
                    color: '#0066cc'
                  }
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#0066cc'
                  }
                }}
              >
                {company}
              </Typography>
            </Box>
          </Box>
          
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
            <Tooltip title="Поділитися">
              <IconButton
                size="small"
                onClick={handleShare}
                sx={{
                  color: '#666',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    color: '#333'
                  }
                }}
              >
                <Share fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={isSaved ? "Видалити з збережених" : "Зберегти"}>
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{
                  color: isSaved ? '#ff6b6b' : '#666',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    color: isSaved ? '#ff5252' : '#333'
                  }
                }}
              >
                {isSaved ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Job Details */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
            <LocationOn fontSize="small" />
            <Typography variant="body2" component="span">
              {location}
            </Typography>
            {isRemote && (
              <Chip
                label="Remote"
                size="small"
                sx={{
                  ml: 1,
                  height: 20,
                  fontSize: '0.7rem',
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  fontWeight: 500
                }}
              />
            )}
          </Box>
          
          {salary && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
              <AttachMoney fontSize="small" />
              <Typography variant="body2" fontWeight={600} color="#2e7d32">
                {salary}
              </Typography>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
            <Work fontSize="small" />
            <Typography variant="body2">
              {experience}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {truncateDescription(description)}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {tags.slice(0, 6).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#e0e0e0',
                color: '#666',
                fontSize: '0.75rem',
                height: 24,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  borderColor: '#ccc'
                }
              }}
            />
          ))}
          {tags.length > 6 && (
            <Chip
              label={`+${tags.length - 6}`}
              size="small"
              variant="outlined"
              sx={{
                borderColor: '#e0e0e0',
                color: '#999',
                fontSize: '0.75rem',
                height: 24
              }}
            />
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#999' }}>
            <Schedule fontSize="small" />
            <Typography variant="caption">
              {postedDate}
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            size="small"
            onClick={handleApplyClick}
            sx={{
              borderColor: '#1c2526',
              color: '#1c2526',
              fontFamily: 'Rubik',
              fontWeight: 500,
              px: 2,
              py: 0.5,
              '&:hover': {
                backgroundColor: '#1c2526',
                color: 'white',
                borderColor: '#1c2526'
              }
            }}
          >
            Відгукнутися
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

VacancyCard.propTypes = {
  vacancy: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    salary: PropTypes.string,
    experience: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    postedDate: PropTypes.string.isRequired,
    isRemote: PropTypes.bool,
    companyLogo: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func,
  onShare: PropTypes.func,
  isSaved: PropTypes.bool
};

export default VacancyCard;