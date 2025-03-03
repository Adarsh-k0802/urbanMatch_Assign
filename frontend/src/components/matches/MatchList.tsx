import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import { getMatches } from '../../services/api';
import { MatchFilters, User } from '../../types';
import { toast } from 'react-toastify';

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MatchList: React.FC = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MatchFilters>({
    min_age: undefined,
    max_age: undefined,
    city: undefined,
    interest_match: true,
  });
  const [expandedFilters, setExpandedFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const fetchMatches = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await getMatches(user.id, filters);
      setMatches(response.matches);
    } catch (err) {
      setError('Failed to fetch matches. Please try again.');
      toast.error('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [user]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : name === 'interest_match' ? value === 'true' : value,
    }));
  };

  const handleApplyFilters = () => {
    fetchMatches();
  };

  const handleResetFilters = () => {
    setFilters({
      min_age: undefined,
      max_age: undefined,
      city: undefined,
      interest_match: true,
    });
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5">Please login to view your matches</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#7e57c2' }}>
            Your Matches
          </Typography>
          <Button
            startIcon={<FilterListIcon />}
            variant="outlined"
            onClick={() => setExpandedFilters(!expandedFilters)}
            sx={{ color: '#7e57c2', borderColor: '#7e57c2' }}
          >
            Filters
            <ExpandMore
              expand={expandedFilters}
              onClick={() => setExpandedFilters(!expandedFilters)}
              aria-expanded={expandedFilters}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Button>
        </Box>

        <Collapse in={expandedFilters} timeout="auto" unmountOnExit>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  id="min_age"
                  label="Min Age"
                  name="min_age"
                  type="number"
                  value={filters.min_age || ''}
                  onChange={handleFilterChange}
                  inputProps={{ min: 18, max: 99 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  id="max_age"
                  label="Max Age"
                  name="max_age"
                  type="number"
                  value={filters.max_age || ''}
                  onChange={handleFilterChange}
                  inputProps={{ min: 18, max: 99 }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={filters.city || ''}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="interest-match-label">Interest Match</InputLabel>
                  <Select
                    labelId="interest-match-label"
                    id="interest_match"
                    name="interest_match"
                    value={filters.interest_match === undefined ? '' : filters.interest_match.toString()}
                    label="Interest Match"
                    onChange={handleFilterChange as any}
                  >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                sx={{ mr: 1, color: 'text.secondary', borderColor: 'text.secondary' }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleApplyFilters}
                sx={{
                  bgcolor: '#7e57c2',
                  '&:hover': {
                    bgcolor: '#5e35b1',
                  },
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
        </Collapse>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#7e57c2' }} />
          </Box>
        ) : matches.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No matches found. Try adjusting your filters.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {matches.map((match) => (
              <Grid item xs={12} sm={6} md={4} key={match.id}>
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
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      bgcolor: '#f5f5f5',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: '#7e57c2',
                        fontSize: '2rem',
                        mb: 1,
                      }}
                    >
                      {match.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {match.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {match.age} years • {match.gender.charAt(0).toUpperCase() + match.gender.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {match.city}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Interests:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {match.interests.map((interest) => (
                        <Chip
                          key={interest.id}
                          label={interest.name.charAt(0).toUpperCase() + interest.name.slice(1)}
                          size="small"
                          sx={{ bgcolor: '#e1bee7', mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ color: '#7e57c2', borderColor: '#7e57c2' }}
                    >
                      View Profile
                    </Button>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => toggleFavorite(match.id)}
                      sx={{ color: favorites.includes(match.id) ? '#e91e63' : 'text.secondary' }}
                    >
                      {favorites.includes(match.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default MatchList; 