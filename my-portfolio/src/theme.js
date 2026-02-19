import { createTheme } from '@mui/material/styles';

// Feastie Color Palette (from color-palette-feastie.md)
const palette = {
  deepPurple: '#4A1A8A',
  hotPink: '#FF69B4',
  redOrange: '#E53620',
  creamWhite: '#FFF8F0',
  skyBlue: '#5BB8E8',
  limeGreen: '#C8E655',
  yellow: '#FFB830',
  black: '#1A1A1A',
  lightPurple: '#6B5B7B',
  lightPink: '#F0A0D0',
  borderLight: '#E0D8E8',
  hoverPink: '#FF4DA6',
};

const theme = createTheme({
  palette: {
    primary: {
      main: palette.deepPurple,
      light: palette.lightPurple,
      dark: '#2E0E5E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: palette.hotPink,
      light: palette.lightPink,
      dark: palette.hoverPink,
      contrastText: palette.deepPurple,
    },
    error: {
      main: palette.redOrange,
    },
    background: {
      default: palette.creamWhite,
      paper: '#FFFFFF',
    },
    text: {
      primary: palette.deepPurple,
      secondary: palette.lightPurple,
      disabled: '#A0A0A0',
    },
    info: {
      main: palette.skyBlue,
    },
    success: {
      main: palette.limeGreen,
    },
    warning: {
      main: palette.yellow,
    },
    custom: palette,
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      color: palette.deepPurple,
    },
    h2: {
      fontWeight: 700,
      color: palette.deepPurple,
    },
    h3: {
      fontWeight: 700,
      color: palette.deepPurple,
    },
    h4: {
      fontWeight: 600,
      color: palette.deepPurple,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      color: palette.black,
    },
    body2: {
      color: palette.lightPurple,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: palette.hotPink,
          color: palette.deepPurple,
          fontWeight: 700,
          '&:hover': {
            backgroundColor: palette.hoverPink,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${palette.borderLight}`,
        },
      },
    },
  },
});

export default theme;
