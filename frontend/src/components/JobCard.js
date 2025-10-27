import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  Avatar,
  Divider
} from '@mui/material';
import {
  LocationOn,
  Business,
  Work,
  ExpandMore,
  ExpandLess,
  BookmarkBorder,
  Bookmark,
  Share,
  Close
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import JobApplication from './JobApplication';

const JobCard = ({ job, onBookmark, isBookmarked, onDismiss }) => {
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showApplication, setShowApplication] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleApply = () => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = '/auth';
      return;
    }
    setShowApplication(true);
  };

  const handleApplicationSuccess = () => {
    // You can add logic here to update the UI
    console.log('Application submitted successfully');
  };

  const getCompanyLogo = (companyName) => {
    // Generate a consistent color based on company name
    const colors = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2', '#303f9f'];
    const colorIndex = companyName?.charCodeAt(0) % colors.length;
    return colors[colorIndex] || '#1976d2';
  };

  const formatSalary = (salary) => {
    if (!salary || salary === 'Competitive') return 'Competitive';
    return salary;
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease-in-out',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            borderColor: '#1976d2'
          }
        }}
      >
        {/* Dismiss Button */}
        {onDismiss && (
          <IconButton
            size="small"
            onClick={() => onDismiss(job.id)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: '#666',
              '&:hover': { color: '#d32f2f' }
            }}
          >
            <Close sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: getCompanyLogo(job.company),
                fontSize: '1.2rem',
                fontWeight: 'bold',
                mr: 2
              }}
            >
              {job.company?.charAt(0)?.toUpperCase() || 'C'}
            </Avatar>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  color: '#1976d2',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 0.5,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {job.profile}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, color: '#424242', mb: 0.5 }}
              >
                {job.company || 'Company Name'}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn sx={{ fontSize: 16, color: '#666' }} />
                <Typography variant="body2" color="text.secondary">
                  {job.location || 'Bengaluru, Karnataka, India'} (On-site)
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => onBookmark && onBookmark(job.id)}
                sx={{ color: isBookmarked ? '#f57c00' : '#666' }}
              >
                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
              <IconButton size="small" sx={{ color: '#666' }}>
                <Share />
              </IconButton>
            </Box>
          </Box>

          {/* Job Details */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Work sx={{ fontSize: 16, color: '#666' }} />
                <Typography variant="body2" color="text.secondary">
                  {job.exp || '2+'} years experience
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Business sx={{ fontSize: 16, color: '#666' }} />
                <Typography variant="body2" color="text.secondary">
                  {formatSalary(job.salary)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Skills */}
          {job.techs && job.techs.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Required Skills:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {job.techs.slice(0, 3).map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1976d2',
                        color: 'white'
                      }
                    }}
                  />
                ))}
                {job.techs.length > 3 && (
                  <Chip
                    label={`+${job.techs.length - 3} more`}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: '#666', color: '#666' }}
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Description Preview */}
          {job.desc && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: expanded ? 'none' : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.4
                }}
              >
                {job.desc}
              </Typography>
              
              <Button
                size="small"
                onClick={handleExpandClick}
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                sx={{ textTransform: 'none', mt: 1 }}
              >
                {expanded ? 'Show less' : 'Show more'}
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleApply}
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                }
              }}
            >
              Apply Now
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Job Application Dialog */}
      <JobApplication
        open={showApplication}
        onClose={() => setShowApplication(false)}
        job={job}
        onSuccess={handleApplicationSuccess}
      />
    </>
  );
};

export default JobCard;
