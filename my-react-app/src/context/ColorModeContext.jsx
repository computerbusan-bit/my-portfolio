import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const ColorModeContext = createContext({ mode: 'light', toggleColorMode: () => {} });

const STORAGE_KEY = 'portfolio-color-mode';

/** localStorage → 없으면 시스템 선호도 → 기본 light */
function getInitialMode() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  const toggleColorMode = useCallback(() => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      // localStorage 저장 + data-theme 속성 갱신 (CSS 변수 즉시 반영)
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute('data-theme', next);
      document.documentElement.style.colorScheme = next;
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
