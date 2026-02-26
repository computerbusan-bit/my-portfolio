import { memo, useMemo, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, Container, Chip,
  IconButton, Tooltip, Divider, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { usePortfolio } from '../context/PortfolioContext';
import { useTypewriter } from '../hooks/useTypewriter';

// ── 상수 ──────────────────────────────────────────────────────────────────────

// 타이핑 모핑 단어 목록
const MORPH_WORDS = ['개발자', '디자이너', '크리에이터'];
const HERO_CHIPS  = ['React', 'JavaScript', 'HTML/CSS', 'Figma'];

// 그라데이션 정의 (TypewriterText 내부에서 공유)
const TYPEWRITER_GRAD = 'linear-gradient(135deg, #1565c0 0%, #1976d2 20%, #42a5f5 50%, #7c4dff 75%, #ec407a 100%)';

// 코드 카드 라인: [color, text] 튜플 배열. null = 빈 줄
const CODE_LINES = [
  [['#ff7b72', 'const '], ['#79c0ff', '김하미'], ['#c9d1d9', ' = () => {']],
  [['#ff7b72', '  const '], ['#c9d1d9', '[skills] = '], ['#d2a8ff', 'useState'], ['#c9d1d9', '([']],
  [['#a5d6ff', "    'React'"], ['#c9d1d9', ', '], ['#a5d6ff', "'Figma'"], ['#c9d1d9', ',']],
  [['#a5d6ff', "    'HTML/CSS'"], ['#c9d1d9', ', '], ['#a5d6ff', "'UX Design'"]],
  [['#c9d1d9', '  ]);']],
  null,
  [['#ff7b72', '  return '], ['#c9d1d9', '(']],
  [['#c9d1d9', '    <'], ['#7ee787', 'Portfolio']],
  [['#79c0ff', '      passion'], ['#c9d1d9', '="unlimited"']],
  [['#79c0ff', '      builder'], ['#c9d1d9', '={true}']],
  [['#c9d1d9', '    />']],
  [['#c9d1d9', '  );']],
  [['#c9d1d9', '};']],
];

// ── 타이핑 텍스트 (그라데이션 + 글자별 bounce-in) ─────────────────────────────

/**
 * TypewriterText
 * - 각 글자: charIn (등장 1회) + gradientWave (무한 파도 그라데이션)
 * - 글자마다 animationDelay 오프셋 → 색상 파도가 왼→오른쪽으로 흐름
 * - 마우스 호버 시 일시정지 (커서가 고정됨)
 */
const TypewriterText = memo(({
  text,
  wordIdx,
  isPaused,
  onMouseEnter,
  onMouseLeave,
  fontSize,
}) => (
  <Box
    component="span"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'default',
      userSelect: 'none',
      fontWeight: 700,
      fontSize: fontSize ?? 'inherit',
      // 빈 상태(단어 전환 직전)에서 레이아웃 유지
      minWidth: '3ch',
    }}
  >
    {text.split('').map((char, i) => (
      <Box
        key={`${wordIdx}-${i}`}  // 단어 바뀌면 전체 재마운트 → charIn 재실행
        component="span"
        sx={{
          display: 'inline-block',
          // 그라데이션 → 텍스트 클리핑
          background: TYPEWRITER_GRAD,
          backgroundSize: '300% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          // charIn: 등장 애니메이션 (1회)
          // gradientWave: 색상 파도 (무한), 글자마다 위상 차이로 파도 효과
          animationName: 'charIn, gradientWave',
          animationDuration: '0.22s, 3.5s',
          animationTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1), ease',
          animationDelay: `0s, ${-(i * 0.28).toFixed(2)}s`,
          animationFillMode: 'both, none',
          animationIterationCount: '1, infinite',
          '@keyframes charIn': {
            from: { opacity: 0, transform: 'translateY(10px) scale(0.5)' },
            to:   { opacity: 1, transform: 'translateY(0)   scale(1)' },
          },
          '@keyframes gradientWave': {
            '0%':   { backgroundPosition: '0%   50%' },
            '50%':  { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0%   50%' },
          },
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </Box>
    ))}

    {/* 커서: 재생 중 깜빡임 / 일시정지 중 고정 */}
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        display: 'inline-block',
        width: '2px',
        height: '1.15em',
        mx: '1.5px',
        bgcolor: isPaused ? 'primary.light' : 'primary.main',
        verticalAlign: 'middle',
        flexShrink: 0,
        transition: 'background-color 0.25s ease',
        animation: isPaused ? 'none' : 'twCursorBlink 1.1s step-end infinite',
        '@keyframes twCursorBlink': {
          '0%, 100%': { opacity: 1 },
          '50%':       { opacity: 0 },
        },
      }}
    />
  </Box>
));

// ── 코드 카드 (데스크톱 전용) ─────────────────────────────────────────────────

const CodeCard = memo(() => (
  <Box sx={{ position: 'relative' }}>
    {/* 배경 글로우 */}
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: -40,
        background: 'radial-gradient(ellipse at 55% 45%, rgba(25,118,210,0.11) 0%, transparent 68%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }}
    />

    {/* 카드 본체 */}
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#0d1117',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.14), 0 8px 24px rgba(25,118,210,0.07), 0 0 0 1px rgba(255,255,255,0.07)',
        fontFamily: '"Fira Code","Cascadia Code","Consolas","Courier New",monospace',
        fontSize: { md: '0.73rem', lg: '0.8rem' },
        lineHeight: 1.9,
        userSelect: 'none',
        opacity: 0,
        animation: 'cardFadeIn 0.7s ease 0.85s forwards',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 36px 80px rgba(0,0,0,0.18), 0 12px 32px rgba(25,118,210,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
        },
        '@keyframes cardFadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* 윈도우 바 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 2, py: 1.5, bgcolor: '#161b22', borderBottom: '1px solid #21262d' }}>
        <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#ff5f57' }} />
        <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#febc2e' }} />
        <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#28c840' }} />
        <Typography variant="caption" sx={{ ml: 1.5, color: '#6e7681', fontFamily: 'inherit', fontSize: 'inherit' }}>
          Developer.jsx
        </Typography>
      </Box>

      {/* 코드 본문 */}
      <Box sx={{ p: 2.5, overflowX: 'auto' }}>
        {CODE_LINES.map((tokens, i) => (
          <Box key={i} component="div" sx={{ display: 'flex', minHeight: '1.9em', alignItems: 'baseline' }}>
            <Box component="span" sx={{ color: '#30363d', minWidth: '1.6ch', mr: '2ch', textAlign: 'right', flexShrink: 0, fontSize: '0.88em', lineHeight: 'inherit' }}>
              {i + 1}
            </Box>
            {tokens?.map(([color, text], j) => (
              <Box key={j} component="span" sx={{ color, whiteSpace: 'pre', lineHeight: 'inherit' }}>
                {text}
              </Box>
            ))}
          </Box>
        ))}
        {/* 커서 */}
        <Box component="div" sx={{ display: 'flex', alignItems: 'baseline', minHeight: '1.9em' }}>
          <Box component="span" sx={{ color: '#30363d', minWidth: '1.6ch', mr: '2ch', textAlign: 'right', flexShrink: 0, fontSize: '0.88em' }}>
            {CODE_LINES.length + 1}
          </Box>
          <Box sx={{ display: 'inline-block', width: '1px', height: '1.1em', bgcolor: '#1976d2', animation: 'cursorBlink 1.2s step-end infinite', '@keyframes cursorBlink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } } }} />
        </Box>
      </Box>

      {/* 상태 바 */}
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.65, bgcolor: '#1976d2', gap: 2 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'inherit', fontSize: '0.67rem', letterSpacing: '0.04em' }}>
          JSX &nbsp;·&nbsp; UTF-8 &nbsp;·&nbsp; React 19
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#28c840', boxShadow: '0 0 5px #28c840', animation: 'statusPulse 2.2s ease-in-out infinite', '@keyframes statusPulse': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.45 } } }} />
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', fontFamily: 'inherit', fontSize: '0.67rem' }}>
            Running
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
));

// ── 소셜 아이콘 버튼 ──────────────────────────────────────────────────────────

const SocialIconBtn = memo(({ href, label, hoverBg, children, isEmail }) => (
  <Tooltip title={label} placement="bottom" arrow>
    <IconButton
      component="a"
      href={href}
      aria-label={label}
      {...(!isEmail && { target: '_blank', rel: 'noopener noreferrer' })}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // 모바일 44px, 데스크톱 40px (터치 타깃 충족)
        width:  { xs: 44, sm: 40 },
        height: { xs: 44, sm: 40 },
        color: 'text.secondary',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.22s ease',
        willChange: 'transform',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '60%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
          transition: 'left 0.45s ease',
          pointerEvents: 'none',
        },
        '&:hover::before': { left: '160%' },
        '&:hover': {
          color: '#ffffff',
          bgcolor: hoverBg,
          borderColor: hoverBg,
          transform: 'translateY(-4px) scale(1.08)',
          boxShadow: `0 8px 20px ${hoverBg}66`,
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: hoverBg,
          outlineOffset: 3,
        },
      }}
    >
      {children}
    </IconButton>
  </Tooltip>
));

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

const HeroSection = memo(() => {
  const theme    = useTheme();
  const isDark   = theme.palette.mode === 'dark';
  const heroRef  = useRef(null);
  // md(900px) 이상 = 코드 카드 표시, 2컬럼 레이아웃
  const isTabletUp  = useMediaQuery(theme.breakpoints.up('sm'));   // 600px+
  const isDesktopUp = useMediaQuery(theme.breakpoints.up('md'));   // 900px+

  const { aboutMeData } = usePortfolio();
  const { name, headline, slogan, links } = useMemo(
    () => aboutMeData.basicInfo,
    [aboutMeData.basicInfo],
  );

  // 타이핑 모핑 훅
  const { displayText, wordIdx, isPaused, pause, resume } = useTypewriter(MORPH_WORDS);

  // ── 배경 도형 패럴렉스 (CSS custom props → DOM 직접 업데이트, React 리렌더 없음) ──
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      el.style.setProperty('--py1', `${(y * 0.15).toFixed(1)}px`);   // 큰 링: 천천히 (멀리)
      el.style.setProperty('--py2', `${(y * -0.08).toFixed(1)}px`);  // 중간 원: 반대 방향 (앞쪽)
      el.style.setProperty('--py3', `${(y * 0.24).toFixed(1)}px`);   // 작은 분홍: 빠르게 (가장 멀리)
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      component="section"
      aria-label="소개"
      ref={heroRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // 모바일 56px / 태블릿+ 64px (AppBar 높이에 맞춤)
        pt: { xs: '56px', sm: '64px' },
        // 모바일 하단 숨쉬기 공간
        pb: { xs: 3, sm: 0 },
        position: 'relative',
        overflow: 'hidden',
        // 도트 그리드 + 그라디언트 배경 (다크/라이트 분기)
        background: [
          `radial-gradient(rgba(25,118,210,${isDark ? '0.10' : '0.06'}) 1px, transparent 1px)`,
          isDark
            ? 'linear-gradient(160deg, #090c12 0%, #0e1829 55%, #100c18 100%)'
            : 'linear-gradient(160deg, #ffffff 0%, #f0f7ff 55%, #fdf0f5 100%)',
        ].join(', '),
        // 모바일은 도트 간격 좁혀서 더 촘촘하게
        backgroundSize: { xs: '22px 22px, 100% 100%', md: '28px 28px, 100% 100%' },
        transition: 'background 0.4s ease',
        // ── 공통 애니메이션 키프레임 ──────────────────────────
        '& .hero-item': { opacity: 0, animation: 'heroFadeUp 0.65s ease forwards' },
        '@keyframes heroFadeUp':  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        '@keyframes dotPulse':    { '0%, 100%': { boxShadow: '0 0 0 0 rgba(25,118,210,0.45)' }, '55%': { boxShadow: '0 0 0 7px rgba(25,118,210,0)' } },
        '@keyframes floatSlow':   { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-24px) rotate(6deg)' } },
        '@keyframes floatMed':    { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        '@keyframes spinRing':    { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        '@keyframes pulseLine':   { '0%, 100%': { transform: 'scaleX(1)', opacity: 0.22 }, '50%': { transform: 'scaleX(1.65)', opacity: 0.44 } },
        '@keyframes scrollDot':   { '0%, 100%': { transform: 'translateY(0)', opacity: 1 }, '60%': { transform: 'translateY(11px)', opacity: 0.15 } },
        '@keyframes ctaPulse':    { '0%': { boxShadow: '0 0 0 0 rgba(25,118,210,0.5)' }, '70%': { boxShadow: '0 0 0 14px rgba(25,118,210,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(25,118,210,0)' } },
        '@keyframes arrowBounce': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(5px)' } },
      }}
    >
      {/* ── 플로팅 배경 도형 ───────────────────────────────── */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* 패럴렉스 레이어 1 — 큰 링 (느리게 이동, 먼 거리감) */}
        <Box sx={{ position: 'absolute', top: '-10%', right: '-6%', willChange: 'transform', transform: 'translate3d(0, var(--py1, 0px), 0)' }}>
          <Box sx={{ width: { xs: 220, sm: 320, md: 480 }, height: { xs: 220, sm: 320, md: 480 }, borderRadius: '50%', border: '1.5px solid rgba(25,118,210,0.13)', animation: 'floatSlow 10s ease-in-out infinite' }} />
        </Box>
        {/* 패럴렉스 레이어 2 — 중간 원 (반대 방향, 가까운 느낌) */}
        <Box sx={{ position: 'absolute', top: '20%', right: '4%', willChange: 'transform', transform: 'translate3d(0, var(--py2, 0px), 0)' }}>
          <Box sx={{ width: { xs: 80, sm: 130, md: 195 }, height: { xs: 80, sm: 130, md: 195 }, borderRadius: '50%', bgcolor: 'rgba(25,118,210,0.05)', animation: 'floatMed 7s ease-in-out infinite 1s' }} />
        </Box>
        {/* 패럴렉스 레이어 3 — 작은 분홍 원 (빠르게 이동, 가장 먼 거리) */}
        <Box sx={{ position: 'absolute', bottom: '18%', left: '2%', willChange: 'transform', transform: 'translate3d(0, var(--py3, 0px), 0)' }}>
          <Box sx={{ width: { xs: 50, sm: 80, md: 105 }, height: { xs: 50, sm: 80, md: 105 }, borderRadius: '50%', bgcolor: 'rgba(220,0,78,0.05)', animation: 'floatMed 8s ease-in-out infinite 0.5s' }} />
        </Box>
        <Box sx={{ position: 'absolute', top: '38%', right: '2%', width: 52, height: 52, borderRadius: '50%', border: '1px dashed rgba(25,118,210,0.22)', animation: 'spinRing 22s linear infinite', display: { xs: 'none', md: 'block' } }} />
        <Box sx={{ position: 'absolute', bottom: '12%', right: '3%', width: 100, height: '1.5px', bgcolor: 'primary.light', opacity: 0.28, transformOrigin: 'left center', animation: 'pulseLine 5s ease-in-out infinite', display: { xs: 'none', sm: 'block' } }} />
        <Box sx={{ position: 'absolute', top: '12%', left: '1%', width: 36, height: 36, borderRadius: '50%', border: '1px dashed rgba(220,0,78,0.18)', animation: 'spinRing 18s linear infinite reverse', display: { xs: 'none', md: 'block' } }} />
      </Box>

      {/* ── 메인 콘텐츠 ────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            // 900px 미만: 1컬럼 / 이상: 2컬럼
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            // 단일 컬럼일 때 gap 불필요
            gap: { xs: 0, md: 7, lg: 8 },
            alignItems: 'center',
          }}
        >
          {/* ── 텍스트 콘텐츠 ────────────────────────────────── */}
          <Box>

            {/* 레이블 + 펄스 점 */}
            <Box
              className="hero-item"
              sx={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 1.5, sm: 2, md: 2.5 } }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, animation: 'dotPulse 2.6s ease-out infinite' }} />
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: 'primary.main', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: { xs: '0.72rem', sm: '0.8rem', md: '0.875rem' } }}
              >
                UX · Code · Design
              </Typography>
            </Box>

            {/* h1 — 그라디언트 헤드라인 */}
            {/*
              xs  (〜599px) : 1.85rem  — 모바일 읽기 편함
              sm  (600〜899): 2.35rem  — 태블릿 세로
              md  (900〜)   : 2.9rem   — 2컬럼 왼쪽 너비에 맞춤
              lg  (1200〜)  : 3.1rem   — 여유로운 데스크톱
            */}
            <Typography
              className="hero-item"
              variant="h1"
              component="h1"
              sx={{
                animationDelay: '0.22s',
                mb: { xs: 1.5, sm: 2, md: 2.5 },
                fontSize: { xs: '1.85rem', sm: '2.35rem', md: '2.9rem', lg: '3.1rem' },
                whiteSpace: 'pre-line',
                wordBreak: 'keep-all',
                lineHeight: { xs: 1.25, md: 1.18 },
                background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 45%, #42a5f5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {headline}
            </Typography>

            {/* h2 — 타이핑 모핑 역할 · 이름 */}
            <Box
              className="hero-item"
              sx={{ animationDelay: '0.38s', display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 1.5, sm: 2, md: 2.5 }, flexWrap: 'wrap' }}
            >
              <Typography
                component="span"
                color="text.secondary"
                sx={{ fontWeight: 500, fontSize: { xs: '0.93rem', sm: '1.05rem', md: '1.3rem' } }}
              >
                프론트엔드
              </Typography>
              <TypewriterText
                text={displayText}
                wordIdx={wordIdx}
                isPaused={isPaused}
                onMouseEnter={pause}
                onMouseLeave={resume}
                fontSize={{ xs: '0.93rem', sm: '1.05rem', md: '1.3rem' }}
              />
              <Typography component="span" sx={{ color: 'text.disabled', fontWeight: 300, fontSize: { xs: '0.93rem', sm: '1.05rem', md: '1.3rem' } }}>
                ·
              </Typography>
              <Typography component="span" color="text.primary" sx={{ fontWeight: 600, fontSize: { xs: '0.93rem', sm: '1.05rem', md: '1.3rem' } }}>
                {name}
              </Typography>
            </Box>

            {/* 설명문 */}
            <Typography
              className="hero-item"
              variant="body1"
              color="text.secondary"
              sx={{
                animationDelay: '0.52s',
                mb: { xs: 2, sm: 2.5, md: 3.5 },
                fontSize: { xs: '0.9rem', sm: '0.97rem', md: '1.02rem' },
                lineHeight: { xs: 1.75, md: 1.85 },
                // 모바일: 전체 너비, 데스크톱: 480px 제한
                maxWidth: { xs: '100%', md: 480 },
                wordBreak: 'keep-all',
                whiteSpace: 'pre-line',
              }}
            >
              {slogan}
            </Typography>

            {/* 스킬 칩 */}
            <Box
              className="hero-item"
              sx={{ animationDelay: '0.64s', display: 'flex', gap: { xs: 0.75, sm: 1 }, flexWrap: 'wrap', mb: { xs: 3, sm: 3.5, md: 4.5 } }}
            >
              {HERO_CHIPS.map((chip) => (
                <Chip
                  key={chip}
                  label={chip}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(25, 118, 210, 0.07)',
                    color: 'primary.dark',
                    border: '1px solid rgba(25, 118, 210, 0.18)',
                    fontWeight: 600,
                    fontSize: { xs: '0.72rem', sm: '0.78rem' },
                    // 터치 타깃 확보
                    height: { xs: 28, sm: 24 },
                    transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(25, 118, 210, 0.14)',
                      transform: 'translateY(-2px) scale(1.06)',
                      boxShadow: '0 4px 12px rgba(25,118,210,0.18)',
                    },
                    '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                  }}
                />
              ))}
            </Box>

            {/* ── Row 1: 주요 CTA ───────────────────────────── */}
            <Box
              className="hero-item"
              sx={{
                animationDelay: '0.76s',
                display: 'flex',
                // 모바일: 세로 / 태블릿+: 가로
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                alignItems: { xs: 'stretch', sm: 'center' },
                mb: 2,
              }}
            >
              {/* Primary */}
              <Button
                variant="contained"
                size="large"
                href="#projects"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  // 모바일 전체 너비, 태블릿+ 자동
                  width: { xs: '100%', sm: 'auto' },
                  // 44px 이상 터치 타깃
                  minHeight: { xs: 52, sm: 48 },
                  animation: 'ctaPulse 2.4s ease-out infinite',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.3s ease',
                  willChange: 'transform',
                  '&:hover': {
                    transform: 'perspective(600px) translateY(-4px) rotateX(-6deg)',
                    boxShadow: '0 14px 32px rgba(25,118,210,0.45)',
                    background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%)',
                    animation: 'none',
                  },
                  '&:active': {
                    transform: 'perspective(600px) translateY(-1px) rotateX(-2deg)',
                  },
                }}
              >
                프로젝트 보기
              </Button>

              {/* Secondary */}
              <Button
                variant="outlined"
                size="large"
                href="#contact"
                startIcon={<ChatBubbleOutlineIcon />}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: { xs: '100%', sm: 'auto' },
                  minHeight: { xs: 52, sm: 48 },
                  transition: 'all 0.25s ease',
                  willChange: 'transform',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s ease',
                    pointerEvents: 'none',
                    zIndex: 1,
                  },
                  '&:hover::after': { left: '160%' },
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(25,118,210,0.28)',
                  },
                }}
              >
                연락하기
              </Button>
            </Box>

            {/* ── Row 2: 소셜 링크 ──────────────────────────── */}
            <Box
              className="hero-item"
              sx={{ animationDelay: '0.88s', display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled', letterSpacing: '0.06em', textTransform: 'uppercase', mr: 1, fontSize: '0.72rem', userSelect: 'none' }}
              >
                Find me on
              </Typography>

              <Divider orientation="vertical" flexItem sx={{ mx: 0.5, opacity: 0.4 }} />

              <SocialIconBtn href={links?.github} label="GitHub" hoverBg="#24292f">
                <GitHubIcon fontSize="small" />
              </SocialIconBtn>

              <SocialIconBtn href={links?.email} label="computer.busan@gmail.com" hoverBg="#ea4335" isEmail>
                <EmailOutlinedIcon fontSize="small" />
              </SocialIconBtn>
            </Box>
          </Box>

          {/* ── 코드 카드 — md(900px) 이상에서만 렌더링 ──────── */}
          {isDesktopUp && <CodeCard />}
        </Box>
      </Container>

      {/* ── 스크롤 인디케이터 ──────────────────────────────── */}
      <Box
        component="a"
        href="#about"
        aria-label="About 섹션으로 스크롤"
        sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.disabled',
          textDecoration: 'none',
          zIndex: 1,
          // 터치 타깃 44px
          minWidth: 44,
          minHeight: 44,
          justifyContent: 'center',
          opacity: 0,
          animation: 'heroFadeUp 0.65s ease 1.2s forwards',
          transition: 'color 0.22s ease',
          '&:hover': { color: 'primary.main' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 4, borderRadius: 1 },
        }}
      >
        {/* 마우스 SVG — 모바일에서 살짝 작게 */}
        <Box
          component="svg"
          viewBox="0 0 22 36"
          width={{ xs: 16, sm: 18 }}
          height={{ xs: 26, sm: 30 }}
          aria-hidden="true"
          sx={{
            display: 'block',
            overflow: 'visible',
            '& .scroll-dot': { animation: 'scrollDot 1.9s ease-in-out infinite', transformOrigin: '11px 10px' },
          }}
        >
          <rect x="1.5" y="1.5" width="19" height="33" rx="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle className="scroll-dot" cx="11" cy="10" r="2.5" fill="currentColor" />
        </Box>

        <Typography variant="caption" sx={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.58rem' }} aria-hidden="true">
          Scroll
        </Typography>

        {/* 바운스 chevron ×2 */}
        <Box
          aria-hidden="true"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 0.25,
            '& svg': { display: 'block', animation: 'arrowBounce 1.5s ease-in-out infinite' },
            '& svg:nth-of-type(2)': { animationDelay: '0.18s', opacity: 0.55, mt: '-6px' },
          }}
        >
          <Box component="svg" viewBox="0 0 16 10" width="16" height="10">
            <polyline points="1,1 8,8 15,1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </Box>
          <Box component="svg" viewBox="0 0 16 10" width="16" height="10">
            <polyline points="1,1 8,8 15,1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default HeroSection;
