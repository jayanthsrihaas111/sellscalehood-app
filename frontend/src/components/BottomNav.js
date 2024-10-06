import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';

function BottomNav({ onChange }) {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (onChange) onChange(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Portfolio" icon={<ShowChartIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
