import { createTheme } from '@mui/material';
import { cyan } from '@mui/material/colors';

export const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '4rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
  },
  palette: {
    primary: {
      main: cyan[300],
      light: cyan.A200,
      dark: '009faf',
      contrastText: 'white',
    },
    grey: {
      100: 'rgba(0, 0, 0, 0.1)',
    },
    text: {
      primary: 'rgb(37, 40, 42)',
    },
  },
});
