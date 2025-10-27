import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Avatar,
  Chip
} from '@mui/material';
import {
  Work,
  Business,
  TrendingUp,
  People,
  LocationOn
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Work sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Find Your Dream Job',
      description: 'Browse thousands of job opportunities and find the perfect match for your skills and career goals.'
    },
    {
      icon: <Business sx={{ fontSize: 40, color: '#388e3c' }} />,
      title: 'Hire Top Talent',
      description: 'Post job openings and connect with qualified candidates from around the world.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#f57c00' }} />,
      title: 'Career Growth',
      description: 'Discover opportunities that align with your career path and help you grow professionally.'
    }
  ];

  const stats = [
    { label: 'Active Jobs', value: '2,500+', color: '#1976d2' },
    { label: 'Companies', value: '500+', color: '#388e3c' },
    { label: 'Job Seekers', value: '50,000+', color: '#f57c00' },
    { label: 'Success Rate', value: '95%', color: '#d32f2f' }
  ];

  const recentJobs = [
    {
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Bengaluru, India',
      type: 'Full-time',
      salary: '$80k - $120k',
      skills: ['React', 'JavaScript', 'Node.js']
    },
    {
      title: 'Full Stack Engineer',
      company: 'InnovateTech',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '$60k - $90k',
      skills: ['Java', 'Spring Boot', 'React']
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudSolutions',
      location: 'Pune, India',
      type: 'Contract',
      salary: '$70k - $100k',
      skills: ['AWS', 'Docker', 'Kubernetes']
    }
  ];

  return (
    <>
      <Navbar />
      

      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Get Hired or Hire
                <br />
                <span style={{ color: '#ffd700' }}>Amazing Talent</span>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                Connect with the best opportunities and talent in the tech industry. 
                Whether you're looking for your next career move or building your dream team.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {!currentUser ? (
                  <>
                    <Button
                      component={Link}
                      to="/auth"
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        background: '#ffd700',
                        color: '#1a237e',
                        fontWeight: 600,
                        '&:hover': {
                          background: '#ffed4e',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      component={Link}
                      to="/employee/feed"
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderColor: 'white',
                        color: 'white',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: '#ffd700',
                          color: '#ffd700'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Browse Jobs
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to={currentUser.userType === 'employer' ? '/employer/dashboard' : '/employee/feed'}
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        background: '#ffd700',
                        color: '#1a237e',
                        fontWeight: 600,
                        '&:hover': {
                          background: '#ffed4e',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {currentUser.userType === 'employer' ? 'Post a Job' : 'Find Jobs'}
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px'
                }}
              >
                <Box
                  sx={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <People sx={{ fontSize: 120, opacity: 0.8 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: stat.color,
                      mb: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: '#1a237e', mb: 6 }}
          >
            Why Choose worSkY?
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, color: '#1a237e' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Recent Jobs Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: '#1a237e', mb: 6 }}
          >
            Latest Job Opportunities
          </Typography>
          
          <Grid container spacing={3}>
            {recentJobs.map((job, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: '#1976d2',
                        mr: 2
                      }}
                    >
                      {job.company.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          color: '#1976d2',
                          fontWeight: 600,
                          mb: 0.5
                        }}
                      >
                        {job.title}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {job.company}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationOn sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Chip
                      label={job.type}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {job.salary}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.skills.slice(0, 3).map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#1976d2', color: '#1976d2' }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              component={Link}
              to="/employee/feed"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                }
              }}
            >
              View All Jobs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
              color: 'white',
              borderRadius: 3
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Ready to Take the Next Step?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of professionals and companies already using worSkY
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  background: '#ffd700',
                  color: '#1a237e',
                  fontWeight: 600,
                  '&:hover': {
                    background: '#ffed4e'
                  }
                }}
              >
                Get Started Now
              </Button>
              <Button
                component={Link}
                to="/employer/dashboard"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#ffd700',
                    color: '#ffd700'
                  }
                }}
              >
                Post a Job
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Home;
