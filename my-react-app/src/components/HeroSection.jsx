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
      <Container maxWidth="lg">
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
