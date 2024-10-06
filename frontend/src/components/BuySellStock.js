import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Box,
  IconButton,
} from '@mui/material';
import { ShoppingCart, Sell } from '@mui/icons-material'; // Import icons for Buy/Sell
import axios from 'axios';

function BuySellStock() {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity to 1 to ensure a positive number
  const [action, setAction] = useState('buy');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value >= 1 ? value : 1); // Ensure quantity is at least 1
  };

  const handleTransaction = async () => {
    if (!ticker || !quantity || quantity < 1) {
      setError('Please fill in all fields with valid values.');
      return;
    }

    try {
      setError('');
      console.log(`Sending request: Action: ${action}, Ticker: ${ticker}, Quantity: ${quantity}`);

      const response = await axios.post(`/api/${action}`, {
        ticker,
        quantity,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMessage(response.data.message);
        setTicker('');
        setQuantity(1); // Reset to a positive value after transaction
      }
    } catch (err) {
      setError('Transaction failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 4,
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          {action === 'buy' ? 'Buy Stock' : 'Sell Stock'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Action</InputLabel>
            <Select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="buy">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingCart sx={{ mr: 1 }} /> Buy
                </Box>
              </MenuItem>
              <MenuItem value="sell">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Sell sx={{ mr: 1 }} /> Sell
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Ticker Symbol"
            variant="outlined"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color={action === 'buy' ? 'primary' : 'secondary'}
            onClick={handleTransaction}
            sx={{
              mt: 2,
              backgroundColor: action === 'buy' ? '#21ce99' : '#f44336',
              ':hover': {
                backgroundColor: action === 'buy' ? '#1da982' : '#d32f2f',
              },
            }}
          >
            {action === 'buy' ? 'Buy' : 'Sell'}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default BuySellStock;
