import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Grid, 
  Alert, Slider
} from '@mui/material';
import { keysApi } from '../services/api';

const KeyGenerationPage = () => {
  const [randomKey, setRandomKey] = useState('');
  const [keyLength, setKeyLength] = useState(32);
  const [password, setPassword] = useState('');
  const [derivedKey, setDerivedKey] = useState('');
  const [salt, setSalt] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateRandomKey = async () => {
    try {
      setLoading(true);
      const response = await keysApi.generateRandomBytes(keyLength);
      setRandomKey(response.data.key);
      setSuccess('Random key generated successfully!');
      setError('');
    } catch (err) {
      setError('Error generating random key: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleDeriveKey = async () => {
    try {
      if (!password) {
        setError('Please enter a password');
        return;
      }
      
      setLoading(true);
      const response = await keysApi.deriveKey(password, salt || null, keyLength);
      if (response.data.salt) {
        setSalt(response.data.salt);
      }
      setDerivedKey(response.data.key);
      setSuccess('Key derived successfully!');
      setError('');
    } catch (err) {
      setError('Error deriving key: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Key Generation
      </Typography>
      <Typography variant="body1" paragraph>
        Two secure methods of key generation are provided:
        1. Cryptographically secure random key generation
        2. Password-based key derivation using PBKDF2
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Random Key Generation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Uses secure random generation (os.urandom)
              Generates cryptographically secure random bytes
            </Typography>
            <Typography id="key-length-slider" gutterBottom>
              Key Length: {keyLength} bytes
            </Typography>
            <Slider
              value={keyLength}
              onChange={(e, newValue) => setKeyLength(newValue)}
              aria-labelledby="key-length-slider"
              valueLabelDisplay="auto"
              step={8}
              marks
              min={16}
              max={64}
              sx={{ mb: 3 }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleGenerateRandomKey}
              sx={{ mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Random Key'}
            </Button>
            {randomKey && (
              <TextField
                fullWidth
                label="Generated Key"
                value={randomKey}
                InputProps={{ readOnly: true }}
                margin="normal"
              />
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Password-Based Key Generation
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Uses PBKDF2 with SHA-256
              100,000 iterations for enhanced security
              Optional custom salt input
            </Typography>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Salt (Optional)"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              margin="normal"
              helperText="Leave empty to generate a random salt"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleDeriveKey}
              sx={{ mt: 2, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Deriving...' : 'Derive Key'}
            </Button>
            {derivedKey && (
              <TextField
                fullWidth
                label="Derived Key"
                value={derivedKey}
                InputProps={{ readOnly: true }}
                margin="normal"
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
);

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
};
export default KeyGenerationPage;