import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeProvider, useColorMode } from './context/ColorModeContext';
import { createAppTheme } from './theme';
import App from './App.jsx';
import { PortfolioProvider } from './context/PortfolioContext';
import './index.css';

/**
 * ThemedApp
 * ColorModeProvider 안에서 mode를 읽어 MUI 테마를 동적으로 생성.
 * useMemo → mode가 바뀔 때만 테마 재생성.
 */
function ThemedApp() {
  const { mode } = useColorMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ColorModeProvider가 최외곽 — ThemeProvider보다 먼저 초기화 */}
    <ColorModeProvider>
      <ThemedApp />
    </ColorModeProvider>
  </React.StrictMode>,
);
