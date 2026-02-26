import { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@mui/material';

// ── 상수 ──────────────────────────────────────────────────────────────────────
const TRAIL_N    = 7;     // 트레일 닷 개수
const RING_LERP  = 0.13;  // 링 추적 속도 (낮을수록 더 부드럽게 지연)
const TRAIL_LERP = 0.17;  // 트레일 체인 속도
const MAG_R      = 90;    // 자기장 반경 (px)
const MAG_F      = 0.4;   // 자기장 인력 강도 (0~1)

// ── 순수 함수: 링 CSS 상태 직접 적용 ─────────────────────────────────────────
function applyRingState(el, state) {
  if (!el) return;
  if (state === 'link') {
    el.style.width           = '52px';
    el.style.height          = '52px';
    el.style.marginLeft      = '-26px';
    el.style.marginTop       = '-26px';
    el.style.borderRadius    = '50%';
    el.style.borderColor     = 'rgba(25,118,210,0.35)';
    el.style.backgroundColor = 'rgba(25,118,210,0.07)';
    el.style.boxShadow       = '0 0 0 5px rgba(25,118,210,0.1)';
  } else if (state === 'text') {
    el.style.width           = '3px';
    el.style.height          = '26px';
    el.style.marginLeft      = '-1.5px';
    el.style.marginTop       = '-13px';
    el.style.borderRadius    = '2px';
    el.style.borderColor     = 'rgba(25,118,210,0.75)';
    el.style.backgroundColor = 'rgba(25,118,210,0.16)';
    el.style.boxShadow       = 'none';
  } else {
    el.style.width           = '30px';
    el.style.height          = '30px';
    el.style.marginLeft      = '-15px';
    el.style.marginTop       = '-15px';
    el.style.borderRadius    = '50%';
    el.style.borderColor     = 'rgba(25,118,210,0.58)';
    el.style.backgroundColor = 'transparent';
    el.style.boxShadow       = 'none';
  }
}

// ── 컴포넌트 ──────────────────────────────────────────────────────────────────

/**
 * 커스텀 커서 전체 효과
 * • 링 팔로워: lerp 지연으로 부드럽게 따라오는 커서 링
 * • 자기장:   버튼/링크 근처에서 링이 중심으로 끌려가는 효과
 * • 커서 변형: 호버 대상별 링 크기·색상·형태 전환
 * • 트레일:   링 뒤에 이어지는 닷 체인 흔적
 * • 클릭 파문: 클릭 위치에 파문 링 애니메이션
 * • 모바일:   (hover: none) 미디어 쿼리 감지 시 자동 비활성화
 */
const CursorGlow = () => {
  const ringRef   = useRef(null);
  const dotRef    = useRef(null);
  const glowRef   = useRef(null);
  const trailRefs = useRef([]);      // 트레일 DOM refs 배열

  // 위치 상태 (ref → React 리렌더 없이 RAF에서만 업데이트)
  const mouse  = useRef({ x: -400, y: -400 });
  const ring   = useRef({ x: -400, y: -400 }); // lerp 적용된 링 위치
  const trails = useRef(
    Array.from({ length: TRAIL_N }, () => ({ x: -400, y: -400 }))
  );
  const raf = useRef(null);

  // 인터랙션 상태
  const hoveredEl   = useRef(null);   // 자기장 대상 DOM 요소
  const cursorState = useRef('default'); // 'default' | 'link' | 'text'
  const isPressed   = useRef(false);  // 마우스 버튼 누름 여부

  const [ripples, setRipples] = useState([]);
  const [isTouch, setIsTouch] = useState(true); // SSR 안전: 기본값 true

  // ── 터치 디바이스 감지 ─────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);
    const h = (e) => setIsTouch(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  // ── 메인 이펙트: 이벤트 등록 + RAF 루프 ────────────────────────────────────
  useEffect(() => {
    if (isTouch) return;

    // 기본 OS 커서 숨김 (전역 !important)
    const styleEl = document.createElement('style');
    styleEl.id = 'cursor-none-override';
    styleEl.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleEl);

    // ── 마우스 이동 ──
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // ── 호버 감지 (이벤트 위임, per-frame DOM 쿼리 X) ──
    const LINK_SEL = 'a[href], button, [role="button"], .MuiButtonBase-root, .MuiChip-root';
    const TEXT_SEL = 'input, textarea, [contenteditable="true"]';

    const onOver = (e) => {
      const linkEl = e.target.closest(LINK_SEL);
      const textEl = !linkEl && e.target.closest(TEXT_SEL);
      const next   = linkEl ? 'link' : textEl ? 'text' : 'default';

      hoveredEl.current = linkEl || null;

      if (cursorState.current !== next) {
        cursorState.current = next;
        applyRingState(ringRef.current, next);
      }
    };

    const onOut = (e) => {
      if (!hoveredEl.current) return;
      const rt = e.relatedTarget;
      if (!rt || !hoveredEl.current.contains(rt)) {
        hoveredEl.current = null;
        if (cursorState.current !== 'default') {
          cursorState.current = 'default';
          applyRingState(ringRef.current, 'default');
        }
      }
    };

    // ── 클릭 press 스케일 ──
    const onDown = () => { isPressed.current = true; };
    const onUp   = () => { isPressed.current = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // ── RAF tick ─────────────────────────────────────────────────────────────
    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // 자기장: 가까운 인터랙티브 요소가 있으면 링 목표를 그쪽으로 끌어당김
      let tx = mx, ty = my;
      if (hoveredEl.current) {
        try {
          const r  = hoveredEl.current.getBoundingClientRect();
          const cx = r.left + r.width  / 2;
          const cy = r.top  + r.height / 2;
          const dx = mx - cx;
          const dy = my - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < MAG_R && dist > 0) {
            const force = (1 - dist / MAG_R) * MAG_F;
            tx = mx - dx * force;
            ty = my - dy * force;
          }
        } catch {
          hoveredEl.current = null;
        }
      }

      // 링 lerp
      ring.current.x += (tx - ring.current.x) * RING_LERP;
      ring.current.y += (ty - ring.current.y) * RING_LERP;

      const rx    = ring.current.x;
      const ry    = ring.current.y;
      const scale = isPressed.current ? 0.7 : 1;

      // 링 위치 + 클릭 스케일 (transform3d → GPU 하드웨어 가속)
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      }

      // 닷: 마우스 즉시 추적
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }

      // 글로우 블롭: 링 위치 중심
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${rx - 200}px, ${ry - 200}px, 0)`;
      }

      // 트레일 체인: 각 닷이 앞 닷을 lerp로 쫓아감
      for (let i = 0; i < TRAIL_N; i++) {
        const src = i === 0 ? ring.current : trails.current[i - 1];
        trails.current[i].x += (src.x - trails.current[i].x) * TRAIL_LERP;
        trails.current[i].y += (src.y - trails.current[i].y) * TRAIL_LERP;

        const el = trailRefs.current[i];
        if (el) {
          // 앞쪽 닷은 크고 선명, 뒤쪽은 작고 흐릿
          const sz  = Math.max(2, 7 - i);
          const op  = ((TRAIL_N - i) / TRAIL_N) * 0.28;
          el.style.transform = `translate3d(${trails.current[i].x - sz / 2}px, ${trails.current[i].y - sz / 2}px, 0)`;
          el.style.opacity   = String(op);
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      document.getElementById('cursor-none-override')?.remove();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
    };
  }, [isTouch]);

  // ── 클릭 파문 ─────────────────────────────────────────────────────────────
  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
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
      {/* ── 글로우 블롭: 배경 부드러운 빛 ── */}
      <Box
        ref={glowRef}
        aria-hidden="true"
        sx={{
          position: 'fixed', top: 0, left: 0,
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25,118,210,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9988,
          willChange: 'transform',
          transform: 'translate3d(-400px,-400px,0)',
        }}
      />

      {/* ── 트레일 닷 체인 ── */}
      {Array.from({ length: TRAIL_N }).map((_, i) => {
        const sz = Math.max(2, 7 - i);
        return (
          <Box
            key={i}
            ref={(el) => { trailRefs.current[i] = el; }}
            aria-hidden="true"
            sx={{
              position: 'fixed', top: 0, left: 0,
              width: sz, height: sz,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              pointerEvents: 'none',
              zIndex: 9989,
              willChange: 'transform, opacity',
              transform: 'translate3d(-400px,-400px,0)',
              opacity: 0,
            }}
          />
        );
      })}

      {/* ── 커서 링: 크기·색상 CSS transition으로 부드럽게 전환 ── */}
      <Box
        ref={ringRef}
        aria-hidden="true"
        sx={{
          position: 'fixed', top: 0, left: 0,
          width: 30, height: 30,
          marginLeft: '-15px', marginTop: '-15px',
          borderRadius: '50%',
          border: '1.5px solid rgba(25,118,210,0.58)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9994,
          willChange: 'transform',
          transform: 'translate3d(-400px,-400px,0)',
          // transform 은 RAF가 직접 조작하므로 transition에서 제외
          transition: [
            'width 0.22s ease',
            'height 0.22s ease',
            'margin 0.22s ease',
            'border-radius 0.22s ease',
            'border-color 0.22s ease',
            'background-color 0.22s ease',
            'box-shadow 0.22s ease',
          ].join(', '),
        }}
      />

      {/* ── 정밀 닷: 마우스 즉시 추적 ── */}
      <Box
        ref={dotRef}
        aria-hidden="true"
        sx={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          marginLeft: '-3px', marginTop: '-3px',
          borderRadius: '50%',
          bgcolor: 'primary.main',
          pointerEvents: 'none',
          zIndex: 9996,
          willChange: 'transform',
          transform: 'translate3d(-400px,-400px,0)',
          opacity: 0.85,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── 클릭 파문 링 ── */}
      {ripples.map((r) => (
        <Box
          key={r.id}
          aria-hidden="true"
          sx={{
            position: 'fixed', top: r.y, left: r.x,
            width: 0, height: 0,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: 'primary.light',
            pointerEvents: 'none',
            zIndex: 9993,
            animation: 'rippleOut 0.65s ease-out forwards',
            '@keyframes rippleOut': {
              '0%':   { width: 0,  height: 0,  transform: 'translate(-50%,-50%)', opacity: 0.9 },
              '100%': { width: 80, height: 80, transform: 'translate(-50%,-50%)', opacity: 0 },
            },
          }}
        />
      ))}
    </>
  );
};

export default CursorGlow;
