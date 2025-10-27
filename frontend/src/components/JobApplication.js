import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import { AttachFile, Send } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const JobApplication = ({ open, onClose, job, onSuccess }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    coverLetter: '',
    expectedSalary: '',
    availableFrom: '',
    resume: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({
        ...formData,
        resume: file
      });
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
    
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        coverLetter: '',
        expectedSalary: '',
        availableFrom: '',
        resume: null
      });
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Apply for {job?.profile}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job?.company} • {job?.exp} years experience
        </Typography>
      </DialogTitle>

      <DialogContent>
        {success ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Application submitted successfully!
            </Alert>
            <Typography variant="body1">
              We'll review your application and get back to you soon.
            </Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Applicant Information
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip 
                  label={`Name: ${currentUser?.name}`} 
                  variant="outlined" 
                  color="primary"
                />
                <Chip 
                  label={`Email: ${currentUser?.email}`} 
                  variant="outlined" 
                  color="primary"
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <TextField
              fullWidth
              label="Cover Letter"
              name="coverLetter"
              multiline
              rows={6}
              value={formData.coverLetter}
              onChange={handleInputChange}
              required
              placeholder="Tell us why you're the perfect fit for this role..."
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Expected Salary (USD)"
                name="expectedSalary"
                type="number"
                value={formData.expectedSalary}
                onChange={handleInputChange}
                required
                placeholder="50000"
              />
              <TextField
                fullWidth
                label="Available From"
                name="availableFrom"
                type="date"
                value={formData.availableFrom}
                onChange={handleInputChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Resume/CV (PDF only)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFile />}
                sx={{ textTransform: 'none' }}
              >
                {formData.resume ? formData.resume.name : 'Choose File'}
                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </Button>
              {formData.resume && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected: {formData.resume.name}
                </Typography>
              )}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !formData.coverLetter || !formData.expectedSalary || !formData.availableFrom}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
            sx={{
              background: 'linear-gradient(45deg, #1a237e 30%, #3949ab 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
              }
            }}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default JobApplication;

