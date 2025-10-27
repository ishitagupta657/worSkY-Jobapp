import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Add,
  Work,
  People,
  TrendingUp,
  Visibility,
  Edit,
  Delete
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Create from './Create';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  // Mock data for demonstration
  const mockJobs = [
    {
      id: '1',
      profile: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Bengaluru, Karnataka, India',
      type: 'Full-time',
      exp: 5,
      salary: '$80k - $120k',
      techs: ['React', 'JavaScript', 'Node.js'],
      desc: 'We are looking for an experienced React developer to join our team.',
      status: 'Active',
      applications: 24,
      views: 156,
      postedDate: '2024-01-15'
    },
    {
      id: '2',
      profile: 'Full Stack Engineer',
      company: 'TechCorp',
      location: 'Mumbai, Maharashtra, India',
      type: 'Full-time',
      exp: 3,
      salary: '$60k - $90k',
      techs: ['Java', 'Spring Boot', 'React'],
      desc: 'Join our dynamic team as a Full Stack Engineer.',
      status: 'Active',
      applications: 18,
      views: 98,
      postedDate: '2024-01-10'
    },
    {
      id: '3',
      profile: 'DevOps Engineer',
      company: 'TechCorp',
      location: 'Pune, Maharashtra, India',
      type: 'Contract',
      exp: 4,
      salary: '$70k - $100k',
      techs: ['AWS', 'Docker', 'Kubernetes'],
      desc: 'Help us build and maintain our cloud infrastructure.',
      status: 'Closed',
      applications: 32,
      views: 203,
      postedDate: '2023-12-20'
    }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = [
    {
      title: 'Active Jobs',
      value: jobs.filter(job => job.status === 'Active').length,
      icon: <Work sx={{ fontSize: 40, color: '#1976d2' }} />,
      color: '#1976d2'
    },
    {
      title: 'Total Applications',
      value: jobs.reduce((sum, job) => sum + job.applications, 0),
      icon: <People sx={{ fontSize: 40, color: '#388e3c' }} />,
      color: '#388e3c'
    },
    {
      title: 'Total Views',
      value: jobs.reduce((sum, job) => sum + job.views, 0),
      icon: <TrendingUp sx={{ fontSize: 40, color: '#f57c00' }} />,
      color: '#f57c00'
    },
    {
      title: 'Success Rate',
      value: '85%',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#d32f2f' }} />,
      color: '#d32f2f'
    }
  ];

  const handleCreateJob = () => {
    setShowCreateJob(true);
  };

  const handleJobCreated = () => {
    setShowCreateJob(false);

    setJobs([...mockJobs, {
      id: Date.now().toString(),
      profile: 'New Job Posting',
      company: currentUser.company || 'Your Company',
      location: 'Location',
      type: 'Full-time',
      exp: 0,
      salary: 'Competitive',
      techs: ['Skills'],
      desc: 'Job description',
      status: 'Active',
      applications: 0,
      views: 0,
      postedDate: new Date().toISOString().split('T')[0]
    }]);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleEditJob = (job) => {
 
    console.log('Edit job:', job);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  if (showCreateJob) {
    return <Create onJobCreated={handleJobCreated} />;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1a237e' }}>
            Employer Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome back, {currentUser?.name}! Manage your job postings and track applications.
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={handleCreateJob}
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
              }
            }}
          >
            Post New Job
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
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
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => setActiveTab('overview')}
                sx={{
                  color: activeTab === 'overview' ? '#1976d2' : 'text.secondary',
                  borderBottom: activeTab === 'overview' ? '2px solid #1976d2' : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: activeTab === 'overview' ? 600 : 400
                }}
              >
                Overview
              </Button>
              <Button
                onClick={() => setActiveTab('jobs')}
                sx={{
                  color: activeTab === 'jobs' ? '#1976d2' : 'text.secondary',
                  borderBottom: activeTab === 'jobs' ? '2px solid #1976d2' : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: activeTab === 'jobs' ? 600 : 400
                }}
              >
                Job Postings
              </Button>
              <Button
                onClick={() => setActiveTab('applications')}
                sx={{
                  color: activeTab === 'applications' ? '#1976d2' : 'text.secondary',
                  borderBottom: activeTab === 'applications' ? '2px solid #1976d2' : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  fontWeight: activeTab === 'applications' ? 600 : 400
                }}
              >
                Applications
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Job Postings
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Applications</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobs.slice(0, 5).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {job.profile}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {job.company}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={job.status}
                              color={getStatusColor(job.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{job.applications}</TableCell>
                          <TableCell>{job.views}</TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleViewJob(job)}
                              sx={{ color: '#1976d2' }}
                            >
                              <Visibility />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleCreateJob}
                    fullWidth
                  >
                    Post New Job
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<People />}
                    fullWidth
                  >
                    View Applications
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<TrendingUp />}
                    fullWidth
                  >
                    View Analytics
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 'jobs' && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                All Job Postings ({jobs.length})
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateJob}
              >
                Post New Job
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Job Title</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applications</TableCell>
                    <TableCell>Posted Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {job.profile}
                        </Typography>
                      </TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>
                        <Chip
                          label={job.status}
                          color={getStatusColor(job.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>{job.postedDate}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewJob(job)}
                            sx={{ color: '#1976d2' }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEditJob(job)}
                            sx={{ color: '#f57c00' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteJob(job.id)}
                            sx={{ color: '#d32f2f' }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 'applications' && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Recent Applications
            </Typography>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <People sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No applications yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Applications will appear here once candidates start applying to your jobs.
              </Typography>
            </Box>
          </Paper>
        )}
      </Container>

      {/* Job Details Dialog */}
      <Dialog
        open={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div">
            {selectedJob?.profile}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedJob?.company} • {selectedJob?.location}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Job Type
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedJob.type}
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Experience Required
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedJob.exp} years
                </Typography>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Salary Range
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedJob.salary}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Required Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {selectedJob.techs.map((tech, index) => (
                    <Chip key={index} label={tech} size="small" />
                  ))}
                </Box>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={selectedJob.status}
                  color={getStatusColor(selectedJob.status)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Job Description
                </Typography>
                <Typography variant="body1">
                  {selectedJob.desc}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Applications: {selectedJob.applications}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Views: {selectedJob.views}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Posted: {selectedJob.postedDate}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowJobDetails(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowJobDetails(false);
              handleEditJob(selectedJob);
            }}
          >
            Edit Job
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
