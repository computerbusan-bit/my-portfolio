import { Box, Container, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import useIntersection from '../hooks/useIntersection';

const MAIN_SKILLS = [
  {
    name: 'HTML5',
    icon: 'https://cdn.simpleicons.org/html5',
    desc: '시맨틱 마크업과 웹 표준 준수',
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.simpleicons.org/css3',
    desc: '반응형 레이아웃, 애니메이션 구현',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.simpleicons.org/javascript',
    desc: 'ES6+ 문법, 비동기 처리',
  },
  {
    name: 'React',
    icon: 'https://cdn.simpleicons.org/react',
    desc: '컴포넌트 설계, 상태 관리',
  },
  {
    name: 'AI-POT',
    icon: null,
    desc: 'AI 기반 서비스 개발',
  },
];

const SUB_SKILLS = [
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite' },
  { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase' },
  { name: 'MUI', icon: 'https://cdn.simpleicons.org/mui' },
];

const SkillFlipCard = ({ skill, delay }) => (
  <Box
    sx={{
      width: { xs: 116, sm: 136 },
      height: { xs: 136, sm: 156 },
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
          gap: 1.5,
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
            sx={{ width: 44, height: 44 }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
          </Box>
        )}
        <Typography
          variant="caption"
          fontWeight={700}
          align="center"
          sx={{ px: 1, lineHeight: 1.3 }}
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
          p: 2,
        }}
      >
        <Typography
          variant="caption"
          align="center"
          sx={{ lineHeight: 1.6, fontWeight: 500 }}
        >
          {skill.desc}
        </Typography>
      </Box>
    </Box>
  </Box>
);

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
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440 }}>
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
                  <SkillFlipCard key={skill.name} skill={skill} delay={0.05 * i} />
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
                      px: 2,
                      py: 1,
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
                      sx={{ width: 18, height: 18 }}
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
