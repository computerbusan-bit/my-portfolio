import { Box, Typography, Button, Container } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        pt: '64px',
        position: 'relative',
        bgcolor: 'background.default',
        overflow: 'hidden',
        '& .hero-item': {
          opacity: 0,
          animation: 'heroFadeUp 0.7s ease forwards',
        },
        '@keyframes heroFadeUp': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* ── 플로팅 배경 장식 ───────────────────────────────── */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          '@keyframes floatSlow': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-22px) rotate(6deg)' },
          },
          '@keyframes floatMed': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-14px)' },
          },
          '@keyframes floatDots': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          '@keyframes pulseLine': {
            '0%, 100%': { transform: 'scaleX(1)', opacity: 0.18 },
            '50%': { transform: 'scaleX(1.5)', opacity: 0.32 },
          },
          '@keyframes spinRing': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
        }}
      >
        <Box sx={{ position: 'absolute', top: '-8%', right: '-4%', width: { xs: 320, md: 500 }, height: { xs: 320, md: 500 }, borderRadius: '50%', border: '1.5px solid', borderColor: 'rgba(25, 118, 210, 0.1)', animation: 'floatSlow 9s ease-in-out infinite' }} />
        <Box sx={{ position: 'absolute', top: '18%', right: '6%', width: { xs: 130, md: 210 }, height: { xs: 130, md: 210 }, borderRadius: '50%', bgcolor: 'rgba(25, 118, 210, 0.04)', animation: 'floatMed 6.5s ease-in-out infinite 1.2s' }} />
        <Box sx={{ position: 'absolute', bottom: '20%', left: '3%', width: { xs: 60, md: 100 }, height: { xs: 60, md: 100 }, borderRadius: '50%', bgcolor: 'rgba(220, 0, 78, 0.04)', animation: 'floatMed 7s ease-in-out infinite 0.4s' }} />
        <Box sx={{ position: 'absolute', bottom: '22%', right: '10%', display: { xs: 'none', md: 'grid' }, gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', animation: 'floatDots 7s ease-in-out infinite 0.8s' }}>
          {Array.from({ length: 25 }).map((_, i) => <Box key={i} sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.25 }} />)}
        </Box>
        <Box sx={{ position: 'absolute', top: '15%', left: '2%', display: { xs: 'none', md: 'grid' }, gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', animation: 'floatDots 8s ease-in-out infinite 2s' }}>
          {Array.from({ length: 9 }).map((_, i) => <Box key={i} sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'secondary.light', opacity: 0.2 }} />)}
        </Box>
        <Box sx={{ position: 'absolute', bottom: '14%', right: '4%', width: 90, height: '1.5px', bgcolor: 'primary.light', transformOrigin: 'left center', animation: 'pulseLine 4.5s ease-in-out infinite' }} />
        <Box sx={{ position: 'absolute', top: '40%', right: '3%', width: { xs: 0, md: 48 }, height: { xs: 0, md: 48 }, borderRadius: '50%', border: '1px dashed', borderColor: 'rgba(25, 118, 210, 0.2)', animation: 'spinRing 20s linear infinite' }} />
      </Box>

      {/* ── 메인 콘텐츠 ───────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 680 }}>
          <Typography
            className="hero-item"
            variant="body1"
            color="primary"
            fontWeight={600}
            sx={{ animationDelay: '0.1s', mb: 1.5, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.875rem' }}
          >
            안녕하세요,
          </Typography>

          <Typography
            className="hero-item"
            variant="h1"
            sx={{ animationDelay: '0.25s', mb: 1, fontSize: { xs: '3rem', sm: '4rem', md: '5rem' } }}
          >
            김하미
          </Typography>

          <Typography
            className="hero-item"
            variant="h2"
            color="text.secondary"
            sx={{ animationDelay: '0.4s', mb: 3, fontWeight: 500, fontSize: { xs: '1.25rem', md: '1.625rem' } }}
          >
            프론트엔드 개발자
          </Typography>

          <Typography
            className="hero-item"
            variant="body1"
            color="text.secondary"
            sx={{ animationDelay: '0.55s', mb: 5, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.85, maxWidth: 480, wordBreak: 'keep-all' }}
          >
            막히면 일단 움직입니다.
            <br />
            그리고 다시, 해냅니다.
          </Typography>

          <Box
            className="hero-item"
            sx={{ animationDelay: '0.7s', display: 'flex', gap: 2, flexWrap: 'wrap' }}
          >
            <Button variant="contained" size="large" href="#projects">
              프로젝트 보기
            </Button>
            <Button variant="outlined" size="large" href="#contact">
              연락하기
            </Button>
          </Box>
        </Box>
      </Container>

      {/* ── 스크롤 인디케이터 (마우스 아이콘) ────────────── */}
      <Box
        component="a"
        href="#about"
        aria-label="아래로 스크롤"
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          color: 'text.disabled',
          textDecoration: 'none',
          zIndex: 1,
          opacity: 0,
          animation: 'heroFadeUp 0.7s ease 1.1s forwards',
          transition: 'color 0.2s',
          '&:hover': { color: 'primary.main' },
        }}
      >
        {/* 마우스 외형 SVG + 스크롤 닷 CSS 애니메이션 */}
        <Box
          component="svg"
          viewBox="0 0 22 36"
          width="20"
          height="33"
          sx={{
            display: 'block',
            overflow: 'visible',
            '@keyframes scrollDot': {
              '0%, 100%': { transform: 'translateY(0px)', opacity: 1 },
              '60%': { transform: 'translateY(11px)', opacity: 0.15 },
            },
            '& .scroll-dot': {
              animation: 'scrollDot 1.9s ease-in-out infinite',
              transformOrigin: '11px 10px',
            },
          }}
        >
          {/* 마우스 바디 */}
          <rect
            x="1.5" y="1.5"
            width="19" height="33"
            rx="9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* 스크롤 휠 닷 */}
          <circle
            className="scroll-dot"
            cx="11" cy="10"
            r="2.5"
            fill="currentColor"
          />
        </Box>

        <Typography
          variant="caption"
          sx={{ letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.62rem' }}
        >
          Scroll
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
