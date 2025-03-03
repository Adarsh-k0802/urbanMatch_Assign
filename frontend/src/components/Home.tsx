import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          backgroundColor: '#7e57c2',
          color: '#fff',
          mb: 4,
          py: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Find Your Perfect Match
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                UrbanMatch helps you connect with like-minded individuals based on your interests,
                preferences, and lifestyle. Start your journey to find meaningful relationships today.
              </Typography>
              {!isAuthenticated && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/register"
                  size="large"
                  sx={{
                    mt: 2,
                    bgcolor: '#fff',
                    color: '#7e57c2',
                    '&:hover': {
                      bgcolor: '#f3e5f5',
                    },
                  }}
                >
                  Get Started
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/matches"
                  size="large"
                  sx={{
                    mt: 2,
                    bgcolor: '#fff',
                    color: '#7e57c2',
                    '&:hover': {
                      bgcolor: '#f3e5f5',
                    },
                  }}
                >
                  View Matches
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Couple"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, fontWeight: 'bold', color: '#7e57c2' }}
        >
          How It Works
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1534131707746-25d604851a1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Create Profile"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#7e57c2' }}>
                  1. Create Your Profile
                </Typography>
                <Typography>
                  Sign up and create your profile with your personal information, interests, and
                  preferences. The more details you provide, the better matches we can find for you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Discover Matches"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#7e57c2' }}>
                  2. Discover Matches
                </Typography>
                <Typography>
                  Our advanced algorithm finds potential matches based on compatibility, shared
                  interests, and preferences. Browse through profiles and find people who resonate with
                  you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Connect"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#7e57c2' }}>
                  3. Connect and Build Relationships
                </Typography>
                <Typography>
                  Start conversations, get to know each other, and build meaningful connections. Our
                  platform is designed to help you find long-lasting relationships.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* Testimonials Section */}
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, fontWeight: 'bold', color: '#7e57c2' }}
        >
          Success Stories
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                "UrbanMatch helped me find my soulmate. We had so many common interests and values.
                We've been together for 2 years now and couldn't be happier!"
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Sarah & Michael
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Matched in 2021
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                "I was skeptical about online matchmaking, but UrbanMatch proved me wrong. The
                matching algorithm is incredible. I found someone who shares my passion for hiking and
                photography."
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  David & Emma
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Matched in 2022
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                "The interest-based matching on UrbanMatch is what sets it apart. I connected with
                someone who shares my love for classical music and art. We're planning our wedding
                now!"
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Jennifer & Robert
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Matched in 2020
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
          {!isAuthenticated ? (
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              size="large"
              sx={{
                bgcolor: '#7e57c2',
                '&:hover': {
                  bgcolor: '#5e35b1',
                },
              }}
            >
              Join UrbanMatch Today
            </Button>
          ) : (
            <Button
              variant="contained"
              component={RouterLink}
              to="/matches"
              size="large"
              sx={{
                bgcolor: '#7e57c2',
                '&:hover': {
                  bgcolor: '#5e35b1',
                },
              }}
            >
              Find Your Match
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 