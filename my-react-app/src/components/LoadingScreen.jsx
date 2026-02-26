import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ── 원호 수치 ──────────────────────────────────────────────────────────────────
const RING_R = 44;
const CIRC   = +(2 * Math.PI * RING_R).toFixed(2); // ≈ 276.46

// ── 진입 애니메이션 공통 sx (스프레드로 재사용) ───────────────────────────────
const FADE_IN = {
  opacity: 0,
  animation: 'ldFadeIn 0.55s ease forwards',
  '@keyframes ldFadeIn': {
    from: { opacity: 0, transform: 'translateY(14px)' },
    to:   { opacity: 1, transform: 'translateY(0)' },
  },
};

// ── 컴포넌트 ──────────────────────────────────────────────────────────────────
const LoadingScreen = ({ onComplete }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [progress, setProgress] = useState(0);
  const [leaving,  setLeaving]  = useState(false);

  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val += Math.random() * 12 + 5;
      if (val >= 100) {
        clearInterval(id);
        setProgress(100);
        setTimeout(() => setLeaving(true), 350);
        setTimeout(onComplete, 950);
        return;
      }
      setProgress(Math.floor(val));
    }, 65);
    return () => clearInterval(id);
  }, [onComplete]);

  // strokeDashoffset: 0 = 완료, CIRC = 비어 있음
  const offset = +(CIRC * (1 - progress / 100)).toFixed(2);

  return (
    <Box
      role="status"
      aria-label="포트폴리오 로딩 중"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        // HeroSection과 동일한 배경 (다크·라이트 대응)
        background: [
          `radial-gradient(rgba(25,118,210,${isDark ? '0.10' : '0.055'}) 1px, transparent 1px)`,
          isDark
            ? 'linear-gradient(160deg, #090c12 0%, #0e1829 55%, #100c18 100%)'
            : 'linear-gradient(160deg, #ffffff 0%, #f0f7ff 55%, #fdf0f5 100%)',
        ].join(', '),
        backgroundSize: '28px 28px, 100% 100%',

        // 퇴장: opacity + 미세 scale down
        opacity:   leaving ? 0 : 1,
        transform: leaving ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >

      {/* ── ① 링 + KH 로고 ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          ...FADE_IN,
          animationDelay: '0s',
          position: 'relative',
          width: 96,
          height: 96,
        }}
      >
        {/* 프로그레스 링 SVG — rotate(-90deg)로 12시 방향 시작 */}
        <Box
          component="svg"
          width={96}
          height={96}
          viewBox="0 0 96 96"
          sx={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        >
          <defs>
            <linearGradient id="loadRingGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#1565c0" />
              <stop offset="100%" stopColor="#42a5f5" />
            </linearGradient>
          </defs>
          {/* 트랙 (흐린 원) */}
          <circle
            cx="48" cy="48" r={RING_R}
            fill="none"
            stroke={isDark ? 'rgba(25,118,210,0.18)' : 'rgba(25,118,210,0.12)'}
            strokeWidth="2.5"
          />
          {/* 프로그레스 아크 (그라데이션) */}
          <circle
            cx="48" cy="48" r={RING_R}
            fill="none"
            stroke="url(#loadRingGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.07s linear' }}
          />
        </Box>

        {/* KH 로고 — 링 중앙 고정 */}
        <Box
          component="svg"
          width="64"
          height="64"
          viewBox="0 0 38 38"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'block',
          }}
        >
          <circle cx="19" cy="19" r="17.5" fill="none" stroke="#1976d2" strokeWidth="1" strokeDasharray="3 2.5" opacity="0.45" />
          <circle cx="19" cy="2.5"  r="1.5" fill="#1976d2" opacity="0.5" />
          <circle cx="19" cy="35.5" r="1.5" fill="#1976d2" opacity="0.5" />
          <circle cx="2.5"  cy="19" r="1.5" fill="#1976d2" opacity="0.5" />
          <circle cx="35.5" cy="19" r="1.5" fill="#1976d2" opacity="0.5" />
          <circle cx="19" cy="19" r="13.5" fill="#1976d2" />
          <circle cx="19" cy="19" r="11.5" fill="none" stroke="white" strokeWidth="0.6" opacity="0.2" />
          <path d="M11 13L11 25M11 19L18 13M11 19L18 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M21 13L21 25M27 13L27 25M21 19L27 19"  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </Box>
      </Box>

      {/* ── ② 이름 (그라데이션) ───────────────────────────────────────────────── */}
      <Typography
        component="div"
        aria-label="김하미"
        sx={{
          ...FADE_IN,
          animationDelay: '0.12s',
          mt: 3.5,
          fontFamily: '"Plus Jakarta Sans","Pretendard",sans-serif',
          fontWeight: 800,
          fontSize: { xs: '1.75rem', sm: '2.1rem' },
          letterSpacing: '-0.025em',
          lineHeight: 1,
          // HeroSection h1과 동일한 그라데이션
          background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 45%, #42a5f5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
        }}
      >
        김하미
      </Typography>

      {/* ── ③ 역할 텍스트 ────────────────────────────────────────────────────── */}
      <Typography
        sx={{
          ...FADE_IN,
          animationDelay: '0.22s',
          mt: 1,
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'text.disabled',
          userSelect: 'none',
        }}
      >
        Front-End Developer
      </Typography>

      {/* ── ④ 숫자 진행률 ────────────────────────────────────────────────────── */}
      <Typography
        aria-live="polite"
        aria-atomic="true"
        sx={{
          ...FADE_IN,
          animationDelay: '0.30s',
          mt: 3.5,
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: 'primary.main',
          fontVariantNumeric: 'tabular-nums',
          userSelect: 'none',
        }}
      >
        {String(progress).padStart(3, '0')}%
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
