import { ThemeProvider } from '@mui/material/styles';
import { PhotoTrick } from './components/PhotoTrick';
import './App.css';
import { theme } from './theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <PhotoTrick />
    </ThemeProvider>
  );
};
