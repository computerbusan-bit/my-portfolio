import { memo, useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Divider,
  Fade,
} from '@mui/material';
import useCountUp from '../hooks/useCountUp';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import ExploreIcon from '@mui/icons-material/Explore';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useIntersection from '../hooks/useIntersection';
import { usePortfolio } from '../context/PortfolioContext';

// ─── Stats 데이터 ─────────────────────────────────────────────────────────────
const STATS_DATA = [
  { value: 5,  suffix: '',  label: '주력 기술' },
  { value: 3,  suffix: '',  label: '개발 철학' },
  { value: 1,  suffix: '년', label: '경력' },
];

const StatCounter = memo(({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 1200, isVisible);
  return (
    <Box sx={{ textAlign: 'center', flex: 1 }}>
      <Typography
        fontWeight={800}
        color="primary.main"
        sx={{
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        }}
      >
        {count}{stat.suffix}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 0.5, display: 'block', fontWeight: 500, letterSpacing: '0.04em' }}
      >
        {stat.label}
      </Typography>
    </Box>
  );
});

// 트레이트 아이콘/색상 (인덱스 순서 고정)
const TRAIT_META = [
  { icon: <ExploreIcon sx={{ fontSize: 28 }} />,       color: 'primary.main',    colorHex: '#1976d2', bg: 'rgba(25, 118, 210, 0.05)' },
  { icon: <TrackChangesIcon sx={{ fontSize: 28 }} />,  color: 'secondary.main',  colorHex: '#dc004e', bg: 'rgba(220, 0, 78, 0.05)' },
  { icon: <DirectionsRunIcon sx={{ fontSize: 28 }} />, color: '#ed6c02',          colorHex: '#ed6c02', bg: 'rgba(237, 108, 2, 0.05)' },
];

// ─── 탭 패널 (접근성 속성 포함) ──────────────────────────────────────────────

const TabPanel = memo(({ value, index, children }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`about-tabpanel-${index}`}
    aria-labelledby={`about-tab-${index}`}
    tabIndex={value === index ? 0 : -1}
    sx={{ pt: 4, outline: 'none' }}
  >
    <Fade in={value === index} timeout={300}>
      <Box>{value === index && children}</Box>
    </Fade>
  </Box>
));

// ─── 특성 카드 ────────────────────────────────────────────────────────────────

const TraitCard = memo(({ trait, idx, isVisible }) => {
  const meta = TRAIT_META[idx] ?? TRAIT_META[0];
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: meta.bg,
        willChange: 'transform',
        // CSS animation으로 입장 처리 → hover transition에 delay 없이 즉시 반응
        opacity: isVisible ? undefined : 0,
        animation: isVisible
          ? `traitIn 0.55s cubic-bezier(0.22,1,0.36,1) ${(0.08 + idx * 0.1).toFixed(2)}s both`
          : 'none',
        '@keyframes traitIn': {
          from: { opacity: 0, transform: 'translate3d(0, 28px, 0)' },
          to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
        transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
        '&:hover': {
          transform: 'translate3d(0, -10px, 0)',
          boxShadow: `0 20px 40px rgba(0,0,0,0.08), 0 6px 16px ${meta.colorHex}28`,
          borderColor: meta.colorHex,
          '& .trait-icon': { transform: 'scale(1.25) rotate(12deg)' },
        },
        '&:focus-within': { borderColor: meta.colorHex },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          p: 2.5,
          '&:last-child': { pb: 2.5 },
        }}
      >
        <Box
          className="trait-icon"
          sx={{ color: meta.color, mt: 0.25, flexShrink: 0, transition: 'transform 0.3s ease', willChange: 'transform' }}
          aria-hidden="true"
        >
          {meta.icon}
        </Box>
        <Box>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {trait.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ wordBreak: 'keep-all' }}
          >
            {trait.desc}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

const AboutSection = memo(() => {
  const [ref, isVisible] = useIntersection();
  const [tabValue, setTabValue] = useState(0);
  const { aboutMeData } = usePortfolio();
  const { basicInfo, sections, traits } = aboutMeData;

  const homeSections = useMemo(
    () => sections.filter((s) => s.showInHome),
    [sections],
  );
  const devStory = useMemo(
    () => sections.find((s) => s.id === 'dev-story'),
    [sections],
  );

  const INFO_ROWS = useMemo(
    () => [
      { Icon: SchoolIcon,   label: '학력', value: basicInfo.education },
      { Icon: MenuBookIcon, label: '전공', value: basicInfo.major },
      { Icon: WorkIcon,     label: '경력', value: basicInfo.experience },
    ],
    [basicInfo],
  );

  return (
    <Box
      id="about"
      component="section"
      sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Box ref={ref}>
          {/* 섹션 헤더 — 아래에서 위로 */}
          <Box
            sx={{
              animation: isVisible ? 'abtUp 0.6s ease 0.05s both' : 'none',
              '@keyframes abtUp': {
                from: { opacity: 0, transform: 'translate3d(0, 32px, 0)' },
                to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
              },
            }}
          >
            <Typography
              variant="body2"
              color="primary"
              fontWeight={600}
              sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}
            >
              About
            </Typography>
            <Typography variant="h2" sx={{ mb: 6 }}>
              저는 이런 사람입니다
            </Typography>
          </Box>

          {/* 프로필 블록 */}
          {/* 프로필 카드 — 왼쪽에서 슬라이드 */}
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
              mb: 5,
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              animation: isVisible ? 'abtLeft 0.65s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
              '@keyframes abtLeft': {
                from: { opacity: 0, transform: 'translate3d(-50px, 0, 0)' },
                to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
              },
              '&:hover': {
                boxShadow: '0 8px 32px rgba(25,118,210,0.1)',
                borderColor: 'primary.light',
              },
            }}
          >
            <CardContent
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                '&:last-child': { pb: { xs: 3, sm: 4, md: 5 } },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { sm: 'center' },
                  gap: { xs: 3, md: 5 },
                }}
              >
                {/* 사진 */}
                <Avatar
                  src={basicInfo.photo || undefined}
                  sx={{
                    width: { xs: 80, md: 112 },
                    height: { xs: 80, md: 112 },
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    fontWeight: 700,
                    bgcolor: 'primary.main',
                    flexShrink: 0,
                    alignSelf: { xs: 'flex-start', sm: 'center' },
                  }}
                  aria-label={`${basicInfo.name} 프로필 사진`}
                >
                  하
                </Avatar>

                {/* 기본 정보 */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography variant="h3">{basicInfo.name}</Typography>
                    <Chip
                      label={basicInfo.role}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Divider sx={{ mb: 2.5 }} />

                  <Box
                    component="dl"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, m: 0 }}
                  >
                    {INFO_ROWS.map(({ Icon, label, value }) => (
                      <Box
                        key={label}
                        sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            color: 'text.disabled',
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
                            mt: '2px',
                          }}
                          aria-hidden="true"
                        >
                          <Icon sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography
                          component="dt"
                          variant="body2"
                          color="text.secondary"
                          sx={{ minWidth: 36, flexShrink: 0 }}
                        >
                          {label}
                        </Typography>
                        <Typography
                          component="dd"
                          variant="body2"
                          color="text.primary"
                          sx={{ wordBreak: 'keep-all', m: 0 }}
                        >
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Stats 카운터 — 오른쪽에서 슬라이드 */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 0, md: 2 },
              mb: 5,
              p: { xs: 2.5, md: 3 },
              bgcolor: 'rgba(25,118,210,0.04)',
              borderRadius: 2,
              border: '1px solid rgba(25,118,210,0.1)',
              animation: isVisible ? 'abtRight 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both' : 'none',
              '@keyframes abtRight': {
                from: { opacity: 0, transform: 'translate3d(50px, 0, 0)' },
                to:   { opacity: 1, transform: 'translate3d(0, 0, 0)' },
              },
            }}
          >
            {STATS_DATA.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} isVisible={isVisible} delay={0.1 + i * 0.12} />
            ))}
          </Box>

          {/* 탭 콘텐츠 — 아래에서 위로 */}
          <Box
            sx={{
              animation: isVisible ? 'abtUp 0.6s ease 0.28s both' : 'none',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
              aria-label="About 섹션 탭"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  minWidth: 0,
                  px: { xs: 2, md: 3 },
                },
              }}
            >
              {homeSections.map((section, idx) => (
                <Tab
                  key={section.id}
                  label={section.title}
                  id={`about-tab-${idx}`}
                  aria-controls={`about-tabpanel-${idx}`}
                />
              ))}
            </Tabs>

            {/* 탭 0: 나의 개발 스토리 */}
            <TabPanel value={tabValue} index={0}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: { xs: 4, md: 6 },
                  alignItems: 'start',
                }}
              >
                <Box>
                  {devStory?.content.split('\n\n').map((para, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: i === 0 ? 3 : 0, fontSize: '1.05rem', wordBreak: 'keep-all' }}
                    >
                      {para}
                    </Typography>
                  ))}
                </Box>

                {/* 슬로건 인용 박스 */}
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    borderRadius: 3,
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <FormatQuoteIcon
                    sx={{ color: 'primary.light', fontSize: 36, mb: 1, opacity: 0.6 }}
                    aria-hidden="true"
                  />
                  <Typography
                    variant="h3"
                    color="primary.dark"
                    sx={{ lineHeight: 1.6, fontStyle: 'italic', wordBreak: 'keep-all', whiteSpace: 'pre-line' }}
                  >
                    {basicInfo.slogan}
                  </Typography>
                </Box>
              </Box>
            </TabPanel>

            {/* 탭 1: 개발 철학 */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {traits.map((trait, idx) => (
                  <TraitCard key={trait.title} trait={trait} idx={idx} isVisible={isVisible} />
                ))}
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default AboutSection;
