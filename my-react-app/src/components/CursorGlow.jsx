import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';

/**
 * 마우스 커서 효과
 * - 부드럽게 따라오는 글로우 블롭
 * - 정밀 커서 닷
 * - 클릭 시 링 파문 효과
 * - 터치 디바이스에서는 자동 비활성화
 */
const CursorGlow = () => {
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -400, y: -400 });
  const lerped = useRef({ x: -400, y: -400 });
  const raf = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [isTouch, setIsTouch] = useState(true); // 기본값 true (SSR 안전)

  // 터치 디바이스 감지
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 마우스 추적 + RAF 애니메이션
  useEffect(() => {
    if (isTouch) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      // lerp: 목표 위치를 향해 7% 씩 접근 (부드러운 지연)
      lerped.current.x += (mouse.current.x - lerped.current.x) * 0.07;
      lerped.current.y += (mouse.current.y - lerped.current.y) * 0.07;

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${lerped.current.x - 200}px, ${lerped.current.y - 200}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [isTouch]);

  // 클릭 파문
  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick, isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* 글로우 블롭 — 부드럽게 지연되어 따라옴 */}
      <Box
        ref={glowRef}
        aria-hidden="true"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(25, 118, 210, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9990,
          willChange: 'transform',
          transform: 'translate(-400px, -400px)',
        }}
      />

      {/* 정밀 커서 닷 — 마우스에 즉시 일치 */}
      <Box
        ref={dotRef}
        aria-hidden="true"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          pointerEvents: 'none',
          zIndex: 9995,
          willChange: 'transform',
          transform: 'translate(-400px, -400px)',
          opacity: 0.55,
          mixBlendMode: 'multiply',
        }}
      />

      {/* 클릭 파문 링 */}
      {ripples.map((r) => (
        <Box
          key={r.id}
          aria-hidden="true"
          sx={{
            position: 'fixed',
            top: r.y,
            left: r.x,
            width: 0,
            height: 0,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: 'primary.light',
            pointerEvents: 'none',
            zIndex: 9993,
            animation: 'rippleOut 0.65s ease-out forwards',
            '@keyframes rippleOut': {
              '0%': {
                width: 0,
                height: 0,
                transform: 'translate(-50%, -50%)',
                opacity: 0.85,
              },
              '100%': {
                width: 80,
                height: 80,
                transform: 'translate(-50%, -50%)',
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </>
  );
};

export default CursorGlow;
