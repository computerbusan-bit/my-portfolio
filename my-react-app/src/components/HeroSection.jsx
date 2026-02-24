import { Box, Typography, Button, Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
      {/* ── 플로팅 장식 요소들 ─────────────────────────────── */}
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
        {/* 큰 원형 링 - 오른쪽 상단 */}
        <Box
          sx={{
            position: 'absolute',
            top: '-8%',
            right: '-4%',
            width: { xs: 320, md: 500 },
            height: { xs: 320, md: 500 },
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: 'rgba(25, 118, 210, 0.1)',
            animation: 'floatSlow 9s ease-in-out infinite',
          }}
        />
        {/* 중간 채운 원 - 오른쪽 중단 */}
        <Box
          sx={{
            position: 'absolute',
            top: '18%',
            right: '6%',
            width: { xs: 130, md: 210 },
            height: { xs: 130, md: 210 },
            borderRadius: '50%',
            bgcolor: 'rgba(25, 118, 210, 0.04)',
            animation: 'floatMed 6.5s ease-in-out infinite 1.2s',
          }}
        />
        {/* 작은 채운 원 - 왼쪽 하단 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '3%',
            width: { xs: 60, md: 100 },
            height: { xs: 60, md: 100 },
            borderRadius: '50%',
            bgcolor: 'rgba(220, 0, 78, 0.04)',
            animation: 'floatMed 7s ease-in-out infinite 0.4s',
          }}
        />
        {/* 점 격자 - 오른쪽 하단 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '22%',
            right: '10%',
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            animation: 'floatDots 7s ease-in-out infinite 0.8s',
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                opacity: 0.25,
              }}
            />
          ))}
        </Box>
        {/* 점 격자 - 왼쪽 상단 (작게) */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            left: '2%',
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            animation: 'floatDots 8s ease-in-out infinite 2s',
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                bgcolor: 'secondary.light',
                opacity: 0.2,
              }}
            />
          ))}
        </Box>
        {/* 수평선 액센트 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '14%',
            right: '4%',
            width: 90,
            height: '1.5px',
            bgcolor: 'primary.light',
            transformOrigin: 'left center',
            animation: 'pulseLine 4.5s ease-in-out infinite',
          }}
        />
        {/* 회전 링 - 오른쪽 중단 (작게) */}
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: '3%',
            width: { xs: 0, md: 48 },
            height: { xs: 0, md: 48 },
            borderRadius: '50%',
            border: '1px dashed',
            borderColor: 'rgba(25, 118, 210, 0.2)',
            animation: 'spinRing 20s linear infinite',
          }}
        />
      </Box>

      {/* ── 메인 콘텐츠 ───────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 680 }}>
          <Typography
            className="hero-item"
            variant="body1"
            color="primary"
            fontWeight={600}
            sx={{
              animationDelay: '0.1s',
              mb: 1.5,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontSize: '0.875rem',
            }}
          >
            안녕하세요,
          </Typography>

          <Typography
            className="hero-item"
            variant="h1"
            sx={{
              animationDelay: '0.25s',
              mb: 1,
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
            }}
          >
            김하미
          </Typography>

          <Typography
            className="hero-item"
            variant="h2"
            color="text.secondary"
            sx={{
              animationDelay: '0.4s',
              mb: 3,
              fontWeight: 500,
              fontSize: { xs: '1.25rem', md: '1.625rem' },
            }}
          >
            프론트엔드 개발자
          </Typography>

          <Typography
            className="hero-item"
            variant="body1"
            color="text.secondary"
            sx={{
              animationDelay: '0.55s',
              mb: 5,
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.85,
              maxWidth: 480,
              wordBreak: 'keep-all',
            }}
          >
            막히면 일단 움직입니다.
            <br />
            그리고 다시, 해냅니다.
          </Typography>

          <Box
            className="hero-item"
            sx={{
              animationDelay: '0.7s',
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
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

      {/* 스크롤 인디케이터 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'text.secondary',
          zIndex: 1,
          animation: 'bounce 2.2s ease-in-out infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(9px)' },
          },
        }}
      >
        <KeyboardArrowDownIcon />
      </Box>
    </Box>
  );
};

export default HeroSection;
