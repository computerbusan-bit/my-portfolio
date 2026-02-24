import { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';

/**
 * 페이지 로딩 화면
 * - KH 로고 + 프로그레스 바
 * - 약 1초 후 페이드아웃
 */
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let val = 0;

    const timer = setInterval(() => {
      // 자연스러운 속도감: 초반엔 빠르게, 후반엔 느려지다가 점프
      val += Math.random() * 13 + 5;
      if (val >= 100) {
        val = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setFading(true), 300);
        setTimeout(onComplete, 900);
        return;
      }
      setProgress(Math.floor(val));
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* KH 로고 (Navbar 동일 SVG) */}
      <Box
        component="svg"
        width="64"
        height="64"
        viewBox="0 0 38 38"
        sx={{
          display: 'block',
          animation: 'loadPulse 1.6s ease-in-out infinite',
          '@keyframes loadPulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
            '50%': { transform: 'scale(1.08)', opacity: 1 },
          },
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

      {/* 프로그레스 바 */}
      <Box sx={{ width: 180 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 2,
            borderRadius: 1,
            bgcolor: 'rgba(25, 118, 210, 0.12)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 1,
              transition: 'transform 0.07s linear',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
