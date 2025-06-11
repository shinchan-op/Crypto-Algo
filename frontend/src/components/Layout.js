import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/', tooltip: 'Navigate to homepage' },
  { text: 'Symmetric Encryption', icon: <LockIcon />, path: '/symmetric', tooltip: 'Encrypt/decrypt with same key' },
  { text: 'Asymmetric Encryption', icon: <EnhancedEncryptionIcon />, path: '/asymmetric', tooltip: 'Public/private key encryption' },
  { text: 'Hashing', icon: <FingerprintIcon />, path: '/hashing', tooltip: 'Generate secure hashes' },
  { text: 'Key Generation', icon: <VpnKeyIcon />, path: '/key-generation', tooltip: 'Create cryptographic keys' },
];

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ 
      background: 'linear-gradient(180deg, rgba(15, 32, 39, 0.9) 0%, rgba(44, 83, 100, 0.9) 100%)',
      height: '100%',
      backdropFilter: 'blur(10px)'
    }}>
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Avatar sx={{ 
          bgcolor: 'primary.main', 
          width: 56, 
          height: 56,
          background: 'linear-gradient(45deg, #00c6ff 30%, #0072ff 90%)'
        }}>
          <SecurityIcon fontSize="large" />
        </Avatar>
      </Toolbar>
      <List>
        {menuItems.map((item, index) => (
          <Tooltip key={item.text} title={item.tooltip} placement="right" arrow>
            <Box
              sx={{
                opacity: 0,
                transform: 'translateX(-20px)',
                animation: `slideIn 0.5s ease forwards ${index * 0.1}s`
              }}
            >
              <ListItem
                button
                component={RouterLink}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? handleDrawerToggle : undefined}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 1,
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background: 'linear-gradient(45deg, rgba(0, 198, 255, 0.2) 30%, rgba(0, 114, 255, 0.2) 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, rgba(0, 198, 255, 0.3) 30%, rgba(0, 114, 255, 0.3) 90%)',
                    }
                  },
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      fontWeight: location.pathname === item.path ? 600 : 400
                    }
                  }}
                />
              </ListItem>
            </Box>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Add CSS keyframes for animation */}
      <style>
        {`
          @keyframes slideIn {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
      
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'rgba(15, 32, 39, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              opacity: 0,
              transform: 'translateY(-20px)',
              animation: 'slideIn 0.5s ease forwards'
            }}
          >
            <Typography variant="h6" noWrap component="div" sx={{ 
              background: 'linear-gradient(45deg, #00c6ff 30%, #0072ff 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>
              Crypto-Algo
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;