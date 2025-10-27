import React, { useState, useEffect } from 'react';
import { Alert, Button, Box, Typography, CircularProgress } from '@mui/material';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState('');
  const [testResult, setTestResult] = useState('');

  const checkBackend = async () => {
    setStatus('checking');
    setError('');
    setTestResult('');

    try {
      const response = await fetch('https://demo-deployment-latest-p92p.onrender.com/allPosts', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        setStatus('connected');
        setTestResult('Backend is running and responding correctly!');
      } else {
        setStatus('error');
        setError(`Backend responded with status: ${response.status}`);
      }
    } catch (err) {
      setStatus('error');
      setError(`Connection failed: ${err.message}`);
    }
  };

  const testJobCreation = async () => {
    setTestResult('Testing job creation...');
    
    try {
      const testData = {
        profile: 'Test Job',
        company: 'Test Company',
        location: 'Test Location',
        type: 'Full-time',
        exp: 2,
        techs: ['JavaScript', 'React'],
        desc: 'This is a test job posting',
        salary: 'Competitive',
        contactEmail: 'test@test.com',
        employerId: 'test-employer'
      };

      const response = await fetch('https://demo-deployment-latest-p92p.onrender.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        const result = await response.json();
        setTestResult(`Test job created successfully! ID: ${result.id}`);
      } else {
        const errorText = await response.text();
        setTestResult(`Test failed: ${response.status} - ${errorText}`);
      }
    } catch (err) {
      setTestResult(`Test error: ${err.message}`);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Backend Status Checker</Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          onClick={checkBackend}
          disabled={status === 'checking'}
          sx={{ mr: 1 }}
        >
          Check Backend
        </Button>
        
        <Button 
          variant="contained" 
          onClick={testJobCreation}
          disabled={status !== 'connected'}
        >
          Test Job Creation
        </Button>
      </Box>

      {status === 'checking' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography>Checking backend connection...</Typography>
        </Box>
      )}

      {status === 'connected' && (
        <Alert severity="success">
          Backend is connected and running on port 8080
        </Alert>
      )}

      {status === 'error' && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      {testResult && (
        <Alert severity={testResult.includes('successfully') ? 'success' : 'info'} sx={{ mt: 2 }}>
          {testResult}
        </Alert>
      )}
    </Box>
  );
};

export default BackendStatus;

