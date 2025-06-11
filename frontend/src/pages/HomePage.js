import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Symmetric Encryption',
      description: 'Encrypt and decrypt data using the same secret key with algorithms like AES.',
      icon: <LockIcon fontSize="large" color="primary" />,
      path: '/symmetric',
    },
    {
      title: 'Asymmetric Encryption',
      description: 'Use public and private key pairs for secure communication with RSA encryption.',
      icon: <EnhancedEncryptionIcon fontSize="large" color="primary" />,
      path: '/asymmetric',
    },
    {
      title: 'Hashing',
      description: 'Generate secure hashes for files and text using various algorithms like SHA-256.',
      icon: <FingerprintIcon fontSize="large" color="primary" />,
      path: '/hashing',
    },
    {
      title: 'Key Generation',
      description: 'Create secure cryptographic keys and derive keys from passwords.',
      icon: <VpnKeyIcon fontSize="large" color="primary" />,
      path: '/key-generation',
    },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Crypto-Algo
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          A comprehensive cryptographic toolkit for secure data operations
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                },
                cursor: 'pointer',
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>{feature.description}</Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(feature.path);
                  }}
                >
                  Try Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary" paragraph>
          This application demonstrates various cryptographic operations using modern web technologies.
          It's designed for educational purposes and showcases the implementation of secure cryptographic
          algorithms in a web environment.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;