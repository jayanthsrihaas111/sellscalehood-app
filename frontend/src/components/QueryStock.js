// src/components/QueryStock.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

function QueryStock() {
  const [ticker, setTicker] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!ticker) {
      setError('Please enter a ticker symbol.');
      return;
    }
    setLoading(true);
    setError('');
    setStockInfo(null);
    try {
      const response = await axios.get(`/api/query?ticker=${ticker}`);
      setStockInfo(response.data);
    } catch (err) {
      setError('Stock not found or API error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Query Stock
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Ticker Symbol"
            variant="outlined"
            fullWidth
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <Button variant="contained" onClick={handleQuery}>
            Search
          </Button>
        </Box>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {stockInfo && (
          <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">{stockInfo.name}</Typography>
            <Typography variant="subtitle1">
              {stockInfo.ticker} - ${stockInfo.price}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default QueryStock;
