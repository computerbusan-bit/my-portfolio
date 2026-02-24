import { Box, Container, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import useIntersection from '../hooks/useIntersection';

const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const MAIN_SKILLS = [
  { name: 'HTML5',      icon: `${DEV}/html5/html5-original.svg`,             desc: '시맨틱 마크업과 웹 표준 준수' },
  { name: 'CSS3',       icon: `${DEV}/css3/css3-original.svg`,               desc: '반응형 레이아웃 & 애니메이션' },
  { name: 'JavaScript', icon: `${DEV}/javascript/javascript-original.svg`,   desc: 'ES6+ 문법, 비동기 처리' },
  { name: 'React',      icon: `${DEV}/react/react-original.svg`,             desc: '컴포넌트 설계, 상태 관리' },
  { name: 'AI-POT',     icon: null,                                          desc: 'AI 기반 서비스 개발' },
];

const SUB_SKILLS = [
  { name: 'Git',      icon: `${DEV}/git/git-original.svg` },
  { name: 'Vite',     icon: `${DEV}/vite/vite-original.svg` },
  { name: 'Supabase', icon: `${DEV}/supabase/supabase-original.svg` },
  { name: 'MUI',      icon: `${DEV}/materialui/materialui-original.svg` },
];

// ─── 카드 크기 (크게 조정) ────────────────────────────────────────────────────
const CARD_W = { xs: 156, sm: 186 };
const CARD_H = { xs: 176, sm: 210 };

const SkillFlipCard = ({ skill, delay }) => (
  <Box
    sx={{
      width: CARD_W,
      height: CARD_H,
      perspective: '800px',
      flexShrink: 0,
      opacity: 0,
      animation: 'skillFadeIn 0.5s ease forwards',
      animationDelay: `${delay}s`,
      '@keyframes skillFadeIn': {
        from: { opacity: 0, transform: 'scale(0.85)' },
        to: { opacity: 1, transform: 'scale(1)' },
      },
      '&:hover .flip-inner': {
        transform: 'rotateY(180deg)',
      },
    }}
  >
    <Box
      className="flip-inner"
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* 앞면 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          bgcolor: 'background.default',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:hover': {
            borderColor: 'primary.light',
            boxShadow: '0 4px 16px rgba(25, 118, 210, 0.12)',
          },
        }}
      >
        {skill.icon ? (
          <Box
            component="img"
            src={skill.icon}
            alt={skill.name}
            sx={{ width: 48, height: 48 }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <AutoAwesomeIcon />
          </Box>
        )}
        <Typography
          variant="body2"
          fontWeight={700}
          align="center"
          sx={{ px: 1.5, whiteSpace: 'nowrap' }}
        >
          {skill.name}
        </Typography>
      </Box>

      {/* 뒷면 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 3,
          p: 2.5,
        }}
      >
        <Typography
          variant="body2"
          align="center"
          sx={{
            lineHeight: 1.7,
            fontWeight: 500,
            wordBreak: 'keep-all',
          }}
        >
          {skill.desc}
        </Typography>
      </Box>
    </Box>
  </Box>
);

// ─── 섹션 컴포넌트 ────────────────────────────────────────────────────────────

const SkillsSection = () => {
  const [ref, isVisible] = useIntersection();

  return (
    <Box
      id="skills"
      component="section"
      sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.default' }}
    >
      <Container maxWidth="lg">
        <Box ref={ref}>
          {/* 섹션 헤더 */}
          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              mb: 7,
            }}
          >
            <Typography
              variant="body2"
              color="primary"
              fontWeight={600}
              sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}
            >
              Skills
            </Typography>
            <Typography variant="h2" sx={{ mb: 1.5 }}>
              사용하는 기술들
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 440, wordBreak: 'keep-all' }}
            >
              카드에 마우스를 올리면 더 자세한 내용을 확인할 수 있어요.
            </Typography>
          </Box>

          {isVisible && (
            <>
              {/* 주력 기술 */}
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                주력 기술
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 2, sm: 2.5 },
                  flexWrap: 'wrap',
                  mb: 7,
                }}
              >
                {MAIN_SKILLS.map((skill, i) => (
                  <SkillFlipCard key={skill.name} skill={skill} delay={0.06 * i} />
                ))}
              </Box>

              {/* 도구 및 환경 */}
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                sx={{ mb: 2.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                도구 및 환경
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {SUB_SKILLS.map((skill) => (
                  <Box
                    key={skill.name}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5,
                      py: 1.25,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.icon}
                      alt={skill.name}
                      sx={{ width: 20, height: 20 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <Typography variant="body2" fontWeight={600}>
                      {skill.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SkillsSection;
