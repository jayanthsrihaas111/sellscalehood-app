// src/components/Portfolio.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import axios from 'axios';


function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('/api/portfolio');
        setPortfolio(response.data.portfolio);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Portfolio
        </Typography>
        {portfolio.length === 0 ? (
          <Alert severity="info">No transactions yet.</Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ticker</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.ticker}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}

export default Portfolio;

