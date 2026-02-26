import { memo, useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import useIntersection from '../hooks/useIntersection';
import useCountUp from '../hooks/useCountUp';
import { usePortfolio } from '../context/PortfolioContext';

// ─── 카드 크기 ────────────────────────────────────────────────────────────────
const CARD_W = { xs: 156, sm: 186 };
const CARD_H = { xs: 176, sm: 210 };

// ─── 원형 미터 상수 ───────────────────────────────────────────────────────────
const CIRC_RADIUS = 32;
const CIRC_LEN = 2 * Math.PI * CIRC_RADIUS; // ~201.06

// ─── 스킬 플립 카드 ───────────────────────────────────────────────────────────
const SkillFlipCard = memo(({ skill, delay }) => (
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
      '&:hover .flip-inner': { transform: 'rotateY(180deg)' },
      '&:hover .skill-icon': {
        transform: 'scale(1.2) rotate(10deg)',
        filter: 'drop-shadow(0 0 8px rgba(25,118,210,0.55))',
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
          transition: 'border-color 0.3s, box-shadow 0.3s',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 8px 24px rgba(25,118,210,0.18), 0 0 0 1px rgba(25,118,210,0.12)',
          },
        }}
      >
        {skill.icon ? (
          <Box
            className="skill-icon"
            component="img"
            src={skill.icon}
            alt={skill.name}
            loading="lazy"
            sx={{ width: 48, height: 48, transition: 'transform 0.35s ease, filter 0.35s ease', willChange: 'transform' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <Box
            sx={{
              width: 48, height: 48, borderRadius: '50%', bgcolor: 'primary.main',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            }}
            aria-hidden="true"
          >
            <AutoAwesomeIcon />
          </Box>
        )}
        <Typography variant="body2" fontWeight={700} align="center" sx={{ px: 1.5, whiteSpace: 'nowrap' }}>
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
        <Typography variant="body2" align="center" sx={{ lineHeight: 1.7, fontWeight: 500, wordBreak: 'keep-all' }}>
          {skill.desc}
        </Typography>
      </Box>
    </Box>
  </Box>
));

// ─── 선형 스킬 바 ─────────────────────────────────────────────────────────────
const SkillBar = memo(({ skill, isVisible, delay }) => {
  const count = useCountUp(skill.level, 1200, isVisible);
  // DOM 마운트 후 한 프레임 뒤에 fill 트리거 → CSS transition이 0→target% 로 동작
  const [fill, setFill] = useState(false);
  useEffect(() => {
    if (!isVisible) return;
    const id = requestAnimationFrame(() => setFill(true));
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {skill.icon ? (
            <Box
              component="img" src={skill.icon} alt="" loading="lazy"
              sx={{ width: 18, height: 18 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <Box
              sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-hidden="true"
            >
              <AutoAwesomeIcon sx={{ fontSize: 10, color: 'white' }} />
            </Box>
          )}
          <Typography variant="body2" fontWeight={600}>{skill.name}</Typography>
        </Box>
        <Typography
          variant="body2" fontWeight={700} color="primary.main"
          sx={{ fontVariantNumeric: 'tabular-nums', minWidth: 36, textAlign: 'right' }}
        >
          {count}%
        </Typography>
      </Box>
      <Box sx={{ height: 7, bgcolor: 'rgba(25,118,210,0.1)', borderRadius: 4, overflow: 'hidden' }}>
        <Box
          sx={{
            height: '100%',
            width: fill ? `${skill.level}%` : '0%',
            background: 'linear-gradient(90deg, #1565c0 0%, #42a5f5 100%)',
            borderRadius: 4,
            transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
          }}
        />
      </Box>
    </Box>
  );
});

// ─── 원형 스킬 미터 (SVG path animation) ─────────────────────────────────────
const CircularSkillMeter = memo(({ skill, isVisible, delay, gradId }) => {
  const count = useCountUp(skill.level, 1200, isVisible);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!isVisible) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {/* SVG 원형 링 */}
      <Box sx={{ position: 'relative', width: 84, height: 84 }}>
        <Box
          component="svg"
          viewBox="0 0 84 84"
          width="84" height="84"
          sx={{ display: 'block', transform: 'rotate(-90deg)' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1565c0" />
              <stop offset="100%" stopColor="#42a5f5" />
            </linearGradient>
          </defs>
          {/* 배경 링 */}
          <circle cx="42" cy="42" r={CIRC_RADIUS} fill="none" stroke="rgba(25,118,210,0.1)" strokeWidth="7" />
          {/* 진행 링 */}
          <circle
            cx="42" cy="42" r={CIRC_RADIUS}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRC_LEN}
            strokeDashoffset={animate ? CIRC_LEN * (1 - skill.level / 100) : CIRC_LEN}
            style={{ transition: `stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s` }}
          />
        </Box>
        {/* 중앙 숫자 */}
        <Box
          sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Typography
            sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'primary.main', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
          >
            {count}%
          </Typography>
        </Box>
      </Box>

      {/* 아이콘 */}
      {skill.icon ? (
        <Box
          component="img" src={skill.icon} alt={skill.name} loading="lazy"
          sx={{ width: 22, height: 22 }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      ) : (
        <Box
          sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-hidden="true"
        >
          <AutoAwesomeIcon sx={{ fontSize: 12, color: 'white' }} />
        </Box>
      )}
      <Typography variant="caption" fontWeight={600} align="center" sx={{ lineHeight: 1.2 }}>
        {skill.name}
      </Typography>
    </Box>
  );
});

// ─── 섹션 컴포넌트 ────────────────────────────────────────────────────────────
const SkillsSection = memo(() => {
  const [ref, isVisible] = useIntersection();
  const { aboutMeData } = usePortfolio();
  const { main: MAIN_SKILLS, sub: SUB_SKILLS } = aboutMeData.skills;

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
              variant="body2" color="primary" fontWeight={600}
              sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}
            >
              Skills
            </Typography>
            <Typography variant="h2" sx={{ mb: 1.5 }}>사용하는 기술들</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440, wordBreak: 'keep-all' }}>
              카드에 마우스를 올리면 더 자세한 내용을 확인할 수 있어요.
            </Typography>
          </Box>

          {isVisible && (
            <>
              {/* ── 주력 기술 (플립 카드) ── */}
              <Typography
                variant="body2" color="text.secondary" fontWeight={600}
                sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                주력 기술
              </Typography>
              <Box sx={{ display: 'flex', gap: { xs: 2, sm: 2.5 }, flexWrap: 'wrap', mb: 7 }}>
                {MAIN_SKILLS.map((skill, i) => (
                  <SkillFlipCard key={skill.name} skill={skill} delay={0.06 * i} />
                ))}
              </Box>

              {/* ── 스킬 레벨 (바 + 원형) ── */}
              <Typography
                variant="body2" color="text.secondary" fontWeight={600}
                sx={{ mb: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                스킬 레벨
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: { xs: 5, md: 8 },
                  mb: 7,
                  alignItems: 'center',
                }}
              >
                {/* 왼쪽: 선형 바 */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {MAIN_SKILLS.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      isVisible={isVisible}
                      delay={0.08 * i}
                    />
                  ))}
                </Box>

                {/* 오른쪽: 원형 미터 */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2.5, sm: 3 }, justifyContent: 'center' }}>
                  {MAIN_SKILLS.map((skill, i) => (
                    <CircularSkillMeter
                      key={skill.name}
                      skill={skill}
                      isVisible={isVisible}
                      delay={0.1 * i}
                      gradId={`sgr-${i}`}
                    />
                  ))}
                </Box>
              </Box>

              {/* ── 도구 및 환경 ── */}
              <Typography
                variant="body2" color="text.secondary" fontWeight={600}
                sx={{ mb: 2.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                도구 및 환경
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {SUB_SKILLS.map((skill, i) => (
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
                      willChange: 'transform',
                      // 스태거 입장 애니메이션 — hover transition과 충돌 없음
                      animation: `chipIn 0.45s cubic-bezier(0.22,1,0.36,1) ${(0.03 * i).toFixed(2)}s both`,
                      '@keyframes chipIn': {
                        from: { opacity: 0, transform: 'translate3d(0, 18px, 0)' },
                        to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
                      },
                      transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px rgba(25,118,210,0.15)',
                        '& .sub-icon': {
                          transform: 'rotate(360deg)',
                          filter: 'drop-shadow(0 0 4px rgba(25,118,210,0.5))',
                        },
                      },
                      '& .sub-icon': { transition: 'transform 0.6s ease, filter 0.3s ease' },
                    }}
                  >
                    <Box
                      className="sub-icon"
                      component="img"
                      src={skill.icon}
                      alt={skill.name}
                      loading="lazy"
                      sx={{ width: 20, height: 20 }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <Typography variant="body2" fontWeight={600}>{skill.name}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
});

export default SkillsSection;
