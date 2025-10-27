import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Container,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Skeleton,
  Alert,
  Button
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear
} from '@mui/icons-material';
import axios from 'axios';
import JobCard from '../components/JobCard';
import Navbar from './Navbar';

const Feed = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [filters, setFilters] = useState({
    experience: '',
    skills: [],
    location: ''
  });
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [dismissedJobs, setDismissedJobs] = useState([]);

  // Available skills for filtering
  const availableSkills = [
    'JavaScript', 'Java', 'Python', 'React', 'Node.js', 'Spring Boot',
    'MongoDB', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning',
    'Data Science', 'DevOps', 'Frontend', 'Backend', 'Full Stack'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    applyFilters();
  }, [posts, filters, query, dismissedJobs]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://demo-deployment-latest-p92p.onrender.com/allPosts');
      
      // Add mock data for missing fields to make the UI look better
      const enhancedPosts = response.data.map(post => ({
        ...post,
        id: post.id || Math.random().toString(36).substr(2, 9),
        salary: post.salary || 'Competitive',
        location: post.location || 'Bengaluru, Karnataka, India',
        type: post.type || 'Full-time',
        postedDate: post.postedDate || new Date().toISOString()
      }));
      
      setPosts(enhancedPosts);
      setError('');
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load job postings. Please try again later.');
      
      const mockPosts = [
        {
          id: '1',
          profile: 'Frontend Engineer',
          company: 'eBay',
          exp: 3,
          techs: ['React', 'JavaScript', 'TypeScript', 'CSS'],
          desc: 'Join our dynamic frontend team to build scalable, user-friendly web applications that serve millions of users worldwide.',
          salary: 'USD 80k - 120k',
          location: 'Bengaluru, Karnataka, India',
          type: 'Full-time'
        },
        {
          id: '2',
          profile: 'SDE 1 - UI',
          company: 'Navi',
          exp: 2,
          techs: ['React', 'JavaScript', 'HTML', 'CSS'],
          desc: 'Work on cutting-edge UI components and help us create seamless user experiences for our financial products.',
          salary: 'INR 15L - 25L',
          location: 'Bengaluru, Karnataka, India',
          type: 'Full-time'
        },
        {
          id: '3',
          profile: 'Associate Software Developer - Java Full stack',
          company: 'Boeing',
          exp: 2,
          techs: ['Java', 'Spring Boot', 'React', 'MongoDB'],
          desc: 'Contribute to mission-critical aerospace software systems and help shape the future of aviation technology.',
          salary: 'INR 12L - 20L',
          location: 'Bengaluru, Karnataka, India',
          type: 'Full-time'
        },
        {
          id: '4',
          profile: 'Senior Python Developer',
          company: 'Google',
          exp: 5,
          techs: ['Python', 'Django', 'PostgreSQL', 'AWS'],
          desc: 'Build scalable backend services and APIs that power Google\'s next-generation products and services.',
          salary: 'USD 150k - 200k',
          location: 'Hyderabad, Telangana, India',
          type: 'Full-time'
        },
        {
          id: '5',
          profile: 'Machine Learning Engineer',
          company: 'Microsoft',
          exp: 4,
          techs: ['Python', 'TensorFlow', 'PyTorch', 'Azure'],
          desc: 'Develop cutting-edge ML models and algorithms that drive innovation across Microsoft\'s product suite.',
          salary: 'USD 120k - 180k',
          location: 'Mumbai, Maharashtra, India',
          type: 'Full-time'
        },
        {
          id: '6',
          profile: 'DevOps Engineer',
          company: 'Amazon',
          exp: 3,
          techs: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
          desc: 'Build and maintain robust CI/CD pipelines and cloud infrastructure for Amazon\'s global services.',
          salary: 'USD 100k - 150k',
          location: 'Pune, Maharashtra, India',
          type: 'Full-time'
        }
      ];
      setPosts(mockPosts);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...posts];

    filtered = filtered.filter(post => !dismissedJobs.includes(post.id));

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(post =>
        post.profile.toLowerCase().includes(searchTerm) ||
        post.company.toLowerCase().includes(searchTerm) ||
        post.desc.toLowerCase().includes(searchTerm) ||
        post.techs.some(tech => tech.toLowerCase().includes(searchTerm))
      );
    }

    // Experience filter
    if (filters.experience) {
      filtered = filtered.filter(post => post.exp >= parseInt(filters.experience));
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(post =>
        filters.skills.some(skill => 
          post.techs.some(tech => tech.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    setFilteredPosts(filtered);
    setPage(1); 
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      experience: '',
      skills: [],
      location: ''
    });
    setQuery('');
  };

  const handleBookmark = (jobId) => {
    setBookmarkedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleDismiss = (jobId) => {
    setDismissedJobs(prev => [...prev, jobId]);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (loading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* LinkedIn-style Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1a237e', mb: 1 }}>
            Top job picks for you
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Based on your profile, preferences, and activity like applies, searches, and saves.
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            {filteredPosts.length} results
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search jobs, companies, or skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'gray' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '50px',
                    backgroundColor: '#fff',
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#999' },
                    '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Experience</InputLabel>
                  <Select
                    value={filters.experience}
                    label="Experience"
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                  >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="0">Entry Level</MenuItem>
                    <MenuItem value="2">2+ years</MenuItem>
                    <MenuItem value="5">5+ years</MenuItem>
                    <MenuItem value="8">8+ years</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Skills</InputLabel>
                  <Select
                    multiple
                    value={filters.skills}
                    label="Skills"
                    onChange={(e) => handleFilterChange('skills', e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {availableSkills.map((skill) => (
                      <MenuItem key={skill} value={skill}>
                        {skill}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  startIcon={<Clear />}
                  onClick={clearFilters}
                  size="small"
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Job Listings */}
        {filteredPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No jobs found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search terms or filters
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {currentPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <JobCard
                    job={post}
                    onBookmark={handleBookmark}
                    isBookmarked={bookmarkedJobs.includes(post.id)}
                    onDismiss={handleDismiss}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Feed;
