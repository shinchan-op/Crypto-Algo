import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, Alert } from '@mui/material';
import { symmetricApi } from '../services/api';

const SymmetricPage = () => {
  const [key, setKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateKey = async () => {
    try {
      setLoading(true);
      const response = await symmetricApi.generateKey();
      setKey(response.data.key);
      setSuccess('Key generated successfully!');
      setError('');
    } catch (err) {
      setError('Error generating key: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleEncrypt = async () => {
    try {
      if (!key) {
        setError('Please generate or enter a key first');
        return;
      }
      if (!plaintext) {
        setError('Please enter text to encrypt');
        return;
      }
      
      setLoading(true);
      const response = await symmetricApi.encrypt(plaintext, key);
      setCiphertext(response.data.ciphertext);
      setSuccess('Text encrypted successfully!');
      setError('');
    } catch (err) {
      setError('Error encrypting: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    try {
      if (!key) {
        setError('Please enter a key first');
        return;
      }
      if (!ciphertext) {
        setError('Please enter text to decrypt');
        return;
      }
      
      setLoading(true);
      const response = await symmetricApi.decrypt(ciphertext, key);
      setPlaintext(response.data.plaintext);
      setSuccess('Text decrypted successfully!');
      setError('');
    } catch (err) {
      setError('Error decrypting: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Symmetric Encryption (Fernet)
      </Typography>
      <Typography variant="body1" paragraph>
        This implementation uses Fernet encryption, which provides:
        • AES-128 in CBC mode for encryption
        • Built-in authentication to prevent tampering
        • Automatic key management and rotation
        • Secure random number generation
      </Typography>
      Symmetric encryption uses the same key for both encryption and decryption.
        Common algorithms include AES, DES, and Blowfish.

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Key Management
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Encryption Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleGenerateKey}
              fullWidth
              disabled={loading}
              sx={{ mt: { xs: 0, md: 2 } }}
            >
              {loading ? 'Generating...' : 'Generate Key'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Encryption
            </Typography>
            <TextField
              fullWidth
              label="Plaintext"
              multiline
              rows={4}
              value={plaintext}
              onChange={(e) => setPlaintext(e.target.value)}
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleEncrypt}
              sx={{ mt: 2 }}
            >
              Encrypt
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Decryption
            </Typography>
            <TextField
              fullWidth
              label="Ciphertext"
              multiline
              rows={4}
              value={ciphertext}
              onChange={(e) => setCiphertext(e.target.value)}
              margin="normal"
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleDecrypt}
              sx={{ mt: 2 }}
            >
              Decrypt
            </Button>
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

export default SymmetricPage;