import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#21ce99',  
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

export default theme;
