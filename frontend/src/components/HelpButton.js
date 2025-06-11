import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const HelpButton = () => {
  const [open, setOpen] = useState(false);

  const securityTips = [
    {
      icon: <SecurityIcon color="primary" />,
      title: "Key Management",
      description: "Always use strong, randomly generated keys and store them securely."
    },
    {
      icon: <WarningIcon color="warning" />,
      title: "Algorithm Selection",
      description: "Avoid deprecated algorithms like MD5 and SHA-1 for security-critical applications."
    },
    {
      icon: <InfoIcon color="info" />,
      title: "Symmetric vs Asymmetric",
      description: "Use symmetric encryption for large data, asymmetric for key exchange and digital signatures."
    },
    {
      icon: <TipsAndUpdatesIcon color="success" />,
      title: "Best Practices",
      description: "Always use authenticated encryption modes and validate all inputs."
    }
  ];

  return (
    <>
      <Tooltip title="Cryptography Help & Tips" placement="left" arrow>
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            },
            '&:active': {
              transform: 'scale(0.9)'
            }
          }}
        >
          <Fab
            color="primary"
            onClick={() => setOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #00c6ff 30%, #0072ff 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0072ff 30%, #00c6ff 90%)',
              }
            }}
          >
            <HelpIcon />
          </Fab>
        </Box>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(35, 41, 58, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #00c6ff 30%, #0072ff 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700
        }}>
          Cryptography Security Tips
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            Here are some essential security tips and best practices for cryptographic operations:
          </Typography>
          <List>
            {securityTips.map((tip, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  mb: 2, 
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'background 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ListItemIcon>{tip.icon}</ListItemIcon>
                <ListItemText
                  primary={tip.title}
                  secondary={tip.description}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HelpButton;