import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  FormHelperText,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { profileUpdateSchema } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../services/api';
import { toast } from 'react-toastify';

// Sample interests for selection
const availableInterests = [
  'Reading',
  'Cooking',
  'Traveling',
  'Photography',
  'Hiking',
  'Music',
  'Movies',
  'Sports',
  'Art',
  'Technology',
  'Dancing',
  'Yoga',
  'Gaming',
  'Gardening',
  'Fashion',
];

const Profile: React.FC = () => {
  const { user, updateUser: updateAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      age: user?.age || '',
      gender: user?.gender || '',
      email: user?.email || '',
      city: user?.city || '',
      interests: user?.interests.map(i => i.name) || [],
    },
    validationSchema: profileUpdateSchema,
    onSubmit: async (values) => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const updatedUser = await updateUser(user.id, {
          ...values,
          age: values.age ? Number(values.age) : undefined,
        });
        
        updateAuthUser(updatedUser);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } catch (err) {
        setError('Failed to update profile. Please try again.');
        toast.error('Failed to update profile');
      } finally {
        setLoading(false);
      }
    },
  });

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5">Please login to view your profile</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: '#7e57c2',
              fontSize: '3rem',
              mb: 2,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Age:</strong> {user.age}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Gender:</strong> {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>City:</strong> {user.city}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Interests:</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
              {user.interests.map((interest) => (
                <Chip
                  key={interest.id}
                  label={interest.name.charAt(0).toUpperCase() + interest.name.slice(1)}
                  sx={{ bgcolor: '#e1bee7' }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#7e57c2' }}>
              {isEditing ? 'Edit Profile' : 'Profile Information'}
            </Typography>
            {!isEditing ? (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setIsEditing(true)}
                sx={{ color: '#7e57c2', borderColor: '#7e57c2' }}
              >
                Edit
              </Button>
            ) : (
              <Box>
                <IconButton
                  color="error"
                  onClick={() => {
                    setIsEditing(false);
                    formik.resetForm();
                  }}
                  sx={{ mr: 1 }}
                >
                  <CancelIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => formik.handleSubmit()}
                  disabled={loading}
                  sx={{ color: '#7e57c2' }}
                >
                  {loading ? <CircularProgress size={24} /> : <SaveIcon />}
                </IconButton>
              </Box>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  type="number"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                  inputProps={{ min: 18, max: 99 }}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  disabled={!isEditing}
                >
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    label="Gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <FormHelperText>{formik.errors.gender}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.interests && Boolean(formik.errors.interests)}
                  disabled={!isEditing}
                >
                  <InputLabel id="interests-label">Interests</InputLabel>
                  <Select
                    labelId="interests-label"
                    id="interests"
                    name="interests"
                    multiple
                    value={formik.values.interests}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={<OutlinedInput id="select-multiple-chip" label="Interests" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {availableInterests.map((interest) => (
                      <MenuItem key={interest} value={interest.toLowerCase()}>
                        {interest}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.interests && formik.errors.interests && (
                    <FormHelperText>{formik.errors.interests as string}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile; 