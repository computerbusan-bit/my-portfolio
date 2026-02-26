import { createTheme } from '@mui/material/styles';

/**
 * createAppTheme(mode)
 * mode: 'light' | 'dark'
 *
 * CSS 변수 & MUI 팔레트를 함께 활용:
 *  - body background: CSS var(--color-bg) → index.html inline script로 깜빡임 방지
 *  - 나머지 컴포넌트: MUI palette.mode 자동 처리
 */
export function createAppTheme(mode = 'light') {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main:  '#1976d2',
        light: '#42a5f5',
        dark:  '#1565c0',
      },
      secondary: {
        main:  '#dc004e',
        light: '#ff5983',
        dark:  '#9a0036',
      },
      background: {
        default: isDark ? '#0f1117' : '#ffffff',
        paper:   isDark ? '#1a1d27' : '#f5f5f5',
      },
      text: {
        primary:   isDark ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.87)',
        secondary: isDark ? 'rgba(255,255,255,0.62)' : 'rgba(0,0,0,0.6)',
        disabled:  isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.38)',
      },
      divider: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.12)',
      action: {
        hover:    isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
        selected: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
      },
    },
    typography: {
      fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Plus Jakarta Sans", "Pretendard", sans-serif',
        fontSize: '5rem',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
      },
      h2: {
        fontFamily: '"Plus Jakarta Sans", "Pretendard", sans-serif',
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h3: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: 1.35 },
      h4: { fontSize: '1.125rem', fontWeight: 600 },
      body1:   { fontSize: '1rem',    fontWeight: 400, lineHeight: 1.75 },
      body2:   { fontSize: '0.875rem',fontWeight: 400, lineHeight: 1.65 },
      caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    },
    spacing: 8,
    shape: { borderRadius: 12 },
    components: {
      // ── 전역 색상 전환 애니메이션 ──────────────────────────────────────────
      MuiCssBaseline: {
        styleOverrides: {
          // CSS 변수(data-theme) 기반 body 배경 전환
          ':root, [data-theme="light"]': {
            '--color-bg': '#ffffff',
          },
          '[data-theme="dark"]': {
            '--color-bg': '#0f1117',
          },
          body: {
            backgroundColor: 'var(--color-bg) !important',
            transition: 'background-color 0.4s ease, color 0.4s ease',
          },
          // Paper/Card/Drawer 등 주요 서피스 부드러운 전환
          '.MuiPaper-root': {
            transition: 'background-color 0.4s ease, box-shadow 0.4s ease !important',
          },
          '.MuiDrawer-paper': {
            transition: 'background-color 0.4s ease !important',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            padding: '10px 24px',
          },
          containedPrimary: {
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 4px 12px rgba(25,118,210,0.3)' },
          },
          outlinedPrimary: {
            '&:hover': { backgroundColor: 'rgba(25,118,210,0.05)' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDark
              ? '0 1px 3px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)'
              : '0 1px 3px rgba(0,0,0,0.08)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500 },
        },
      },
    },
  });
}

// 하위 호환: 기본 내보내기 유지
export default createAppTheme('light');
