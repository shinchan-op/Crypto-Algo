import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Container, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Symmetric Encryption',
      description: 'Fast and efficient encryption using the same secret key for both encryption and decryption. Perfect for large data sets.',
      icon: <LockIcon fontSize="large" />,
      path: '/symmetric',
      color: '#00c6ff',
      tags: ['AES', 'Fast', 'Secure']
    },
    {
      title: 'Asymmetric Encryption',
      description: 'Public-key cryptography for secure communication without sharing secret keys. Ideal for key exchange and digital signatures.',
      icon: <EnhancedEncryptionIcon fontSize="large" />,
      path: '/asymmetric',
      color: '#ff6b6b',
      tags: ['RSA', 'Public Key', 'Digital Signatures']
    },
    {
      title: 'Hashing',
      description: 'Generate unique fingerprints for data integrity verification and password storage using cryptographic hash functions.',
      icon: <FingerprintIcon fontSize="large" />,
      path: '/hashing',
      color: '#4ecdc4',
      tags: ['SHA-256', 'Integrity', 'One-way']
    },
    {
      title: 'Key Generation',
      description: 'Create cryptographically secure random keys and derive keys from passwords using industry-standard algorithms.',
      icon: <VpnKeyIcon fontSize="large" />,
      path: '/key-generation',
      color: '#ffe66d',
      tags: ['Random', 'PBKDF2', 'Secure']
    },
  ];

  const benefits = [
    { icon: <SecurityIcon />, title: 'Military-Grade Security', description: 'Industry-standard algorithms' },
    { icon: <SpeedIcon />, title: 'High Performance', description: 'Optimized for speed and efficiency' },
    { icon: <VerifiedUserIcon />, title: 'Verified Implementation', description: 'Tested and validated cryptography' }
  ];

  const handleFeatureClick = (path, title) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 8, 
        py: 6,
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #00c6ff 30%, #0072ff 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            mb: 3
          }}
        >
          Welcome to Crypto-Algo
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph sx={{ mb: 4 }}>
          A comprehensive cryptographic toolkit for secure data operations
        </Typography>
        
        {/* Benefits */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 1 }}>
                  {benefit.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={6} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${feature.color}, ${feature.color}aa)`,
                }
              }}
              onClick={() => handleFeatureClick(feature.path, feature.title)}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: feature.color, mr: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ mb: 0 }}>
                    {feature.title}
                  </Typography>
                </Box>
                
                <Typography paragraph sx={{ mb: 3 }}>
                  {feature.description}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  {feature.tags.map((tag, tagIndex) => (
                    <Chip
                      key={tagIndex}
                      label={tag}
                      size="small"
                      sx={{
                        mr: 1,
                        mb: 1,
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                        border: `1px solid ${feature.color}40`
                      }}
                    />
                  ))}
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: `linear-gradient(45deg, ${feature.color}, ${feature.color}cc)`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${feature.color}cc, ${feature.color})`,
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(feature.path, feature.title);
                  }}
                >
                  Explore {feature.title}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Footer Section */}
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary" paragraph>
          This application demonstrates various cryptographic operations using modern web technologies.
          Built with security best practices and designed for educational purposes.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          🔒 All operations are performed client-side for maximum security
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;