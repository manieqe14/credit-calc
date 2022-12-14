import { createTheme, PaletteMode, PaletteOptions, Theme } from '@mui/material';

const colours = {
  black: '#000000',
  oxfordBlue: '#14213d',
  orangeWeb: '#fca311',
  platinum: '#e5e5e5',
  white: '#ffffff',
  lightWhite: 'rgba(255, 255, 255, 0.2)',
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
    light: '#666',
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
      primary: {
        ...palette.primary,
        main: colours.white,
        light: colours.lightWhite,
        dark: colours.orangeWeb,
        contrastText: colours.oxfordBlue,
      },
      secondary: {
        ...palette.secondary,
        main: colours.orangeWeb,
        light: colours.white,
      },
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
        fontSize: '1.75rem',
        fontWeight: '500',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 400,
        letterSpacing: '0.15rem',
      },
    },
  });
