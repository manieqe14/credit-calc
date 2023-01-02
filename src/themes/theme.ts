import { createTheme, PaletteMode, PaletteOptions, Theme } from '@mui/material';
import { assoc } from 'ramda';

const colours = {
  black: '#000000',
  oxfordBlue: '#14213d',
  orangeWeb: '#fca311',
  platinum: '#e5e5e5',
  white: '#ffffff',
};

const palette: PaletteOptions = {
  primary: {
    main: colours.oxfordBlue,
    light: colours.platinum,
    dark: colours.black,
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
};

const getPalette = (
  mode: PaletteMode,
  palette: PaletteOptions
): PaletteOptions => {
  if (mode === 'dark') {
    return {
      ...palette,
      mode,
      primary: assoc('dark', colours.white, palette.primary),
      text: {
        primary: colours.white,
      },
      background: {
        default: colours.black,
        paper: colours.black,
      },
    };
  } else {
    return palette;
  }
};
export const theme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: getPalette(mode, palette),
    typography: {
      fontFamily: 'Roboto',
      h1: {
        fontSize: '4rem',
      },
      h2: {
        fontSize: '2.5rem',
      },
    },
  });
