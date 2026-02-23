import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B00',
      light: '#FF9240',
      dark: '#C44D00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E53935',
      light: '#FF6F60',
      dark: '#AB000D',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#141414',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#BDBDBD',
    },
    divider: '#2a2a2a',
    action: {
      hover: 'rgba(255, 107, 0, 0.08)',
    },
  },
  typography: {
    fontFamily: '"Barlow Condensed", "Roboto Condensed", "Roboto", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '0.01em',
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #FF6B00, #E53935)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF9240, #FF6F60)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #2a2a2a',
          backgroundImage: 'none',
          '&:hover': {
            borderColor: '#FF6B00',
            boxShadow: '0 0 20px rgba(255,107,0,0.15)',
          },
          transition: 'border-color 0.2s, box-shadow 0.2s',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B00',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#000000',
          borderBottom: '2px solid #FF6B00',
        },
      },
    },
  },
})

export default theme
