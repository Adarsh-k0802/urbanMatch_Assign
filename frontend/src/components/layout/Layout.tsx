import React from 'react';
import { Container, Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
        }}
      >
        <Navbar />
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#e0e0e0',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Box sx={{ color: 'text.secondary' }}>
              © {new Date().getFullYear()} UrbanMatch - Find Your Perfect Match
            </Box>
          </Container>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Layout; 