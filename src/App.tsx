import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PhotoTrick } from './components/PhotoTrick';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PhotoTrick />
    </ThemeProvider>
  );
};
