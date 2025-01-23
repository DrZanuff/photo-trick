import { createTheme } from '@mui/material/styles';

export const COLORS = {
  PRIMARY_MAIN: '#6C63FF',
  PRIMARY_CONTRAST: '#FFFFFF',
  SECONDARY_MAIN: '#00C9A7',
  SECONDARY_CONTRAST: '#FFFFFF',
  BACKGROUND_DEFAULT: '#121212',
  BACKGROUND_PAPER: '#1E1E1E',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#B3B3B3',
  INFO_MAIN: '#8A2BE2',
  WARNING_MAIN: '#FF4081',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.PRIMARY_MAIN,
      contrastText: COLORS.PRIMARY_CONTRAST,
    },
    secondary: {
      main: COLORS.SECONDARY_MAIN,
      contrastText: COLORS.SECONDARY_CONTRAST,
    },
    background: {
      default: COLORS.BACKGROUND_DEFAULT,
      paper: COLORS.BACKGROUND_PAPER,
    },
    text: {
      primary: COLORS.TEXT_PRIMARY,
      secondary: COLORS.TEXT_SECONDARY,
    },
    info: {
      main: COLORS.INFO_MAIN,
    },
    warning: {
      main: COLORS.WARNING_MAIN,
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            opacity: 0.9,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.BACKGROUND_PAPER,
        },
      },
    },
  },
});
