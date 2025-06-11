import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, Alert } from '@mui/material';
import { asymmetricApi } from '../services/api';

const AsymmetricPage = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateKeyPair = async () => {
    try {
      setLoading(true);
      const response = await asymmetricApi.generateKeyPair();
      setPublicKey(response.data.public_key);
      setPrivateKey(response.data.private_key);
      setSuccess('Key pair generated successfully!');
      setError('');
    } catch (err) {
      setError('Error generating key pair: ' + (err.response?.data?.detail || err.message));
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleEncrypt = async () => {
    try {
      if (!publicKey) {
        setError('Please generate or enter a public key first');
        return;
      }
      if (!plaintext) {
        setError('Please enter text to encrypt');
        return;
      }
      
      setLoading(true);
      const response = await asymmetricApi.encrypt(plaintext, publicKey);
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
      if (!privateKey) {
        setError('Please enter a private key first');
        return;
      }
      if (!ciphertext) {
        setError('Please enter text to decrypt');
        return;
      }
      
      setLoading(true);
      const response = await asymmetricApi.decrypt(ciphertext, privateKey);
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
        Asymmetric Encryption (RSA)
      </Typography>
      <Typography variant="body1" paragraph>
        This implementation uses RSA encryption with:
        • 2048-bit key size for strong security
        • OAEP padding with SHA-256 for enhanced security
        • Public key for encryption
        • Private key for decryption
      </Typography>
      <Typography variant="body1" paragraph>
        Asymmetric encryption uses a pair of keys: a public key for encryption and a private key for decryption.
        RSA is one of the most widely used asymmetric encryption algorithms.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Key Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGenerateKeyPair}
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Key Pair'}
        </Button>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Public Key"
              multiline
              rows={4}
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Private Key"
              multiline
              rows={4}
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              margin="normal"
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Encryption (with Public Key)
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
              Decryption (with Private Key)
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

export default AsymmetricPage;