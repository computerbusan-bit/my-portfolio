import { memo } from 'react';
import { Box, Tooltip } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useColorMode } from '../context/ColorModeContext';

/**
 * DarkModeToggle
 * - 52 × 28px 필 스위치
 * - 썸: 라이트 모드 ☀️  ↔  다크 모드 🌙 크로스페이드 + 스핀
 * - 배경: 하늘색(라이트) ↔ 네이비(다크)
 * - aria-pressed로 접근성 지원
 */
const DarkModeToggle = memo(() => {
  const { mode, toggleColorMode } = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Tooltip
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      placement="bottom"
      arrow
    >
      <Box
        component="button"
        onClick={toggleColorMode}
        aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
        aria-pressed={isDark}
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: 52,
          height: 28,
          borderRadius: 999,
          bgcolor: isDark ? '#1e2d45' : '#dbeafe',
          border: '1.5px solid',
          borderColor: isDark ? 'rgba(25,118,210,0.55)' : 'rgba(25,118,210,0.22)',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.25s ease',
          '&:hover': {
            boxShadow: '0 0 0 3px rgba(25,118,210,0.18)',
            borderColor: 'primary.main',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        {/* ── 슬라이딩 썸 ── */}
        <Box
          sx={{
            position: 'absolute',
            width: 22,
            height: 22,
            borderRadius: '50%',
            bgcolor: isDark ? '#1976d2' : '#ffffff',
            boxShadow: isDark
              ? '0 0 8px rgba(25,118,210,0.6)'
              : '0 1px 4px rgba(0,0,0,0.18)',
            left: isDark ? 27 : 3,
            transition: [
              'left 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              'background-color 0.4s ease',
              'box-shadow 0.4s ease',
            ].join(', '),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ☀️ — 라이트 모드에서 보임 */}
          <WbSunnyRoundedIcon
            aria-hidden="true"
            sx={{
              fontSize: 13,
              color: '#f59e0b',
              position: 'absolute',
              opacity: isDark ? 0 : 1,
              transform: isDark ? 'rotate(-90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
              transition: 'opacity 0.25s ease, transform 0.35s ease',
            }}
          />
          {/* 🌙 — 다크 모드에서 보임 */}
          <DarkModeRoundedIcon
            aria-hidden="true"
            sx={{
              fontSize: 12,
              color: '#e3f0ff',
              position: 'absolute',
              opacity: isDark ? 1 : 0,
              transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)',
              transition: 'opacity 0.25s ease, transform 0.35s ease',
            }}
          />
        </Box>

        {/* ── 필 배경 장식: 별(다크) / 태양 잔상(라이트) ── */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            left: 7,
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            opacity: isDark ? 1 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ width: 2, height: 2, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.75)' }} />
          <Box sx={{ width: 1.5, height: 1.5, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.5)', ml: '2px' }} />
        </Box>
      </Box>
    </Tooltip>
  );
});

export default DarkModeToggle;
