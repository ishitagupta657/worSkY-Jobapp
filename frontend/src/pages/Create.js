import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormHelperText,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';
import {
  Business,
  Work,
  Description,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const steps = ['Job Details', 'Requirements', 'Company Info', 'Review & Submit'];

const Create = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    profile: '',
    company: '',
    location: '',
    type: 'Full-time',
    exp: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    techs: [],
    desc: '',
    requirements: '',
    benefits: '',
    contactEmail: '',
    applicationDeadline: ''
  });

  const [errors, setErrors] = useState({});

  const skillSet = [
    'JavaScript', 'Java', 'Python', 'React', 'Node.js', 'Spring Boot',
    'MongoDB', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning',
    'Data Science', 'DevOps', 'Frontend', 'Backend', 'Full Stack',
    'Angular', 'Vue.js', 'PHP', 'C#', '.NET', 'Ruby', 'Go', 'Rust'
  ];

  const jobTypes = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'
  ];

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = () => {
    const newErrors = {};

    switch (activeStep) {
      case 0:
        if (!formData.profile.trim()) newErrors.profile = 'Job title is required';
        if (!formData.company.trim()) newErrors.company = 'Company name is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;
      case 1:
        if (!formData.exp) newErrors.exp = 'Experience is required';
        if (formData.techs.length === 0) newErrors.techs = 'At least one skill is required';
        if (!formData.desc.trim()) newErrors.desc = 'Job description is required';
        break;
      case 2:
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
        break;
      default:
        break;
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSalaryChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value
      }
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      techs: prev.techs.includes(skill)
        ? prev.techs.filter(s => s !== skill)
        : [...prev.techs, skill]
    }));
    
    if (errors.techs) {
      setErrors(prev => ({ ...prev, techs: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setError('');

    try {
      try {
        const healthCheck = await fetch('https://demo-deployment-latest-p92p.onrender.com/allPosts', { method: 'GET' });
        if (!healthCheck.ok) {
          throw new Error('Backend is not responding. Please ensure the Spring Boot server is running on port 8080.');
        }
      } catch (healthError) {
        throw new Error('Cannot connect to backend server. Please check if the Spring Boot application is running on port 8080.');
      }
      const postData = {
        ...formData,
        exp: parseInt(formData.exp),
        salary: formData.salary.min && formData.salary.max 
          ? `${formData.salary.currency} ${formData.salary.min} - ${formData.salary.max}`
          : 'Competitive',
   
        applicationDeadline: formData.applicationDeadline 
          ? new Date(formData.applicationDeadline)
          : null,
        
        employerId: 'temp-employer-id', 
        techs: formData.techs || []
      };

      console.log('Form data before transformation:', formData);
      console.log('Transformed data being sent to backend:', postData);

      const response = await fetch('https://demo-deployment-latest-p92p.onrender.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        setSuccess(true);
        setTimeout(() => {
          navigate('/employer/dashboard');
        }, 2000);
      } else {
        const errorData = await response.text();
        console.error('Backend error response:', errorData);
        throw new Error(`Backend error: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error('Error creating job posting:', error);
      setError(`Failed to create job posting: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Work color="primary" />
                Basic Job Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title *"
                name="profile"
                value={formData.profile}
                onChange={handleInputChange}
                error={!!errors.profile}
                helperText={errors.profile}
                placeholder="e.g., Senior React Developer"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name *"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                error={!!errors.company}
                helperText={errors.company}
                placeholder="e.g., TechCorp Inc."
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location *"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                error={!!errors.location}
                helperText={errors.location}
                placeholder="e.g., Bengaluru, Karnataka, India"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Job Type"
                  onChange={handleInputChange}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Description color="primary" />
                Job Requirements & Description
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Years of Experience *"
                name="exp"
                type="number"
                value={formData.exp}
                onChange={handleInputChange}
                error={!!errors.exp}
                helperText={errors.exp}
                placeholder="e.g., 3"
                required
                inputProps={{ min: 0, max: 20 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Salary Range</InputLabel>
                <Select
                  value={`${formData.salary.min}-${formData.salary.max}`}
                  label="Salary Range"
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-');
                    handleSalaryChange('min', min);
                    handleSalaryChange('max', max);
                  }}
                >
                  <MenuItem value="30000-50000">$30k - $50k</MenuItem>
                  <MenuItem value="50000-80000">$50k - $80k</MenuItem>
                  <MenuItem value="80000-120000">$80k - $120k</MenuItem>
                  <MenuItem value="120000-150000">$120k - $150k</MenuItem>
                  <MenuItem value="150000-200000">$150k+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>
                Required Skills *
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                {skillSet.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onClick={() => handleSkillToggle(skill)}
                    color={formData.techs.includes(skill) ? 'primary' : 'default'}
                    variant={formData.techs.includes(skill) ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
              {errors.techs && (
                <FormHelperText error>{errors.techs}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description *"
                name="desc"
                multiline
                rows={6}
                value={formData.desc}
                onChange={handleInputChange}
                error={!!errors.desc}
                helperText={errors.desc}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                required
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business color="primary" />
                Additional Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email *"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleInputChange}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
                placeholder="hr@company.com"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Application Deadline"
                name="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Requirements"
                name="requirements"
                multiline
                rows={3}
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Any additional requirements or qualifications..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Benefits & Perks"
                name="benefits"
                multiline
                rows={3}
                value={formData.benefits}
                onChange={handleInputChange}
                placeholder="Health insurance, flexible hours, remote work, etc..."
              />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle color="primary" />
              Review Your Job Posting
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">Job Title</Typography>
                  <Typography variant="body1">{formData.profile}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">Company</Typography>
                  <Typography variant="body1">{formData.company}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{formData.location}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">Experience</Typography>
                  <Typography variant="body1">{formData.exp} years</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Skills</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {formData.techs.map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {formData.desc}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
          <Typography variant="h4" gutterBottom>
            Job Posted Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your job posting has been created and is now visible to job seekers.
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, color: '#1a237e', mb: 4 }}>
            Create New Job Posting
          </Typography>



          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                    sx={{
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      }
                    }}
                  >
                    {loading ? 'Creating...' : 'Create Job Posting'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Create;
