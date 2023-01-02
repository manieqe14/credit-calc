import { createTheme } from '@mui/material';

const colours = {
  black: '#000000',
  oxfordBlue: '#14213d',
  orangeWeb: '#fca311',
  platinum: '#e5e5e5',
  white: '#ffffff',
};
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
      main: colours.oxfordBlue,
      light: colours.platinum,
      dark: '009faf',
      contrastText: 'white',
    },
    secondary: {
      main: colours.orangeWeb,
    },
    grey: {
      100: 'rgba(0, 0, 0, 0.1)',
    },
    text: {
      primary: 'rgb(37, 40, 42)',
    },
    background: {
      paper: colours.white,
    },
  },
});
