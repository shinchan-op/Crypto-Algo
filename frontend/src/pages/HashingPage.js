import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Grid, 
  Alert, FormControl, InputLabel, Select, MenuItem,
  Tooltip
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { hashingApi } from '../services/api';

const HashingPage = () => {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('sha256');
  const [hashResult, setHashResult] = useState('');
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [algorithms] = useState([
    { value: 'md5', label: 'MD5', warning: true, tooltip: 'Not recommended for security-critical applications' },
    { value: 'sha1', label: 'SHA-1', warning: true, tooltip: 'Not recommended for security-critical applications' },
    { value: 'sha256', label: 'SHA-256', tooltip: 'Recommended for general use' },
    { value: 'sha384', label: 'SHA-384', tooltip: 'Strong hash function, part of SHA-2 family' },
    { value: 'sha512', label: 'SHA-512', tooltip: 'Very strong hash function, recommended for sensitive data' },
    { value: 'sha3_256', label: 'SHA3-256', tooltip: 'Modern hash function with strong security guarantees' },
    { value: 'blake2b', label: 'BLAKE2b', tooltip: 'Fast and secure hash function' }
  ]);

  useEffect(() => {
    // Fetch available algorithms when component mounts
    const fetchAlgorithms = async () => {
      try {
        const response = await hashingApi.getAlgorithms();
        if (response.data && response.data.algorithms) {
          const formattedAlgos = response.data.algorithms.map(algo => ({
            value: algo,
            label: algo.toUpperCase().replace('_', '-')
          }));
        }
      } catch (err) {
        console.error('Error fetching algorithms:', err);
      }
    };
    
    fetchAlgorithms();
  }, []);

  const handleTextHash = async () => {
    try {
      if (!text) {
        setError('Please enter text to hash');
        return;
      }
      
      setLoading(true);
      const response = await hashingApi.hashText(text, algorithm);
      setHashResult(response.data.hash);
      setSuccess('Text hashed successfully!');
      setError('');
    } catch (err) {
      setError('Error hashing text: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileHash = async () => {
    try {
      if (!file) {
        setError('Please select a file to hash');
        return;
      }
      
      setLoading(true);
      const response = await hashingApi.hashFile(file, algorithm);
      setFileHash(response.data.hash);
      setSuccess('File hashed successfully!');
      setError('');
    } catch (err) {
      setError('Error hashing file: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Hashing
      </Typography>
      <Typography variant="body1" paragraph>
        Hashing is a one-way function that converts data of any size into a fixed-size string.
        It's commonly used for data integrity verification, password storage, and digital signatures.
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="algorithm-select-label">Hash Algorithm</InputLabel>
        // Update the Select component:
        <Select labelId="algorithm-select-label"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                label="Hash Algorithm">
          {algorithms.map((algo) => (
            <MenuItem key={algo.value} value={algo.value}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {algo.label}
                {algo.warning && (
                  <Tooltip title={algo.tooltip}>
                    <Warning color="warning" sx={{ ml: 1 }} />
                  </Tooltip>
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Text Hashing
            </Typography>
            <TextField
              fullWidth
              label="Text to Hash"
              multiline
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleTextHash}
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Hashing...' : 'Generate Hash'}
            </Button>
            {hashResult && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Hash Result:
                </Typography>
                <TextField
                  fullWidth
                  value={hashResult}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              File Hashing
            </Typography>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2, mb: 2, height: 56 }}
            >
              {file ? file.name : 'Select File'}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleFileHash}
              disabled={!file || loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Hashing...' : 'Generate Hash'}
            </Button>
            {fileHash && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  File Hash Result:
                </Typography>
                <TextField
                  fullWidth
                  value={fileHash}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default HashingPage;