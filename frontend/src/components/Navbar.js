// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SellScaleHood
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/">
            Query Stock
          </Button>
          <Button color="inherit" component={Link} to="/buy-sell">
            Buy/Sell Stock
          </Button>
          <Button color="inherit" component={Link} to="/portfolio">
            Portfolio
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
