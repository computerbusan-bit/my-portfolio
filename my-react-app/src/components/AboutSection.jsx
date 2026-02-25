import { useState } from 'react';
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
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import ExploreIcon from '@mui/icons-material/Explore';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useIntersection from '../hooks/useIntersection';
import { usePortfolio } from '../context/PortfolioContext';

// 트레이트 아이콘/색상 (인덱스 순서 고정)
const TRAIT_META = [
  { icon: <ExploreIcon sx={{ fontSize: 28 }} />,       color: 'primary.main',    bg: 'rgba(25, 118, 210, 0.05)' },
  { icon: <TrackChangesIcon sx={{ fontSize: 28 }} />,  color: 'secondary.main',  bg: 'rgba(220, 0, 78, 0.05)' },
  { icon: <DirectionsRunIcon sx={{ fontSize: 28 }} />, color: '#ed6c02',          bg: 'rgba(237, 108, 2, 0.05)' },
];

// ─── 탭 패널 ─────────────────────────────────────────────────────────────────

const TabPanel = ({ value, index, children }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 4 }}>
    {value === index && children}
  </Box>
);

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

const AboutSection = () => {
  const [ref, isVisible] = useIntersection();
  const [tabValue, setTabValue] = useState(0);
  const { aboutMeData } = usePortfolio();
  const { basicInfo, sections, traits } = aboutMeData;

  const homeSections = sections.filter((s) => s.showInHome);
  const devStory = sections.find((s) => s.id === 'dev-story');

  const INFO_ROWS = [
    { Icon: SchoolIcon,   label: '학력', value: basicInfo.education },
    { Icon: MenuBookIcon, label: '전공', value: basicInfo.major },
    { Icon: WorkIcon,     label: '경력', value: basicInfo.experience },
  ];

  return (
    <Box
      id="about"
      component="section"
      sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        <Box
          ref={ref}
          sx={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* 섹션 헤더 */}
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

          {/* 프로필 블록 */}
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
              mb: 5,
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

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
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
                        >
                          <Icon sx={{ fontSize: 18 }} />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ minWidth: 36, flexShrink: 0 }}
                        >
                          {label}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ wordBreak: 'keep-all' }}
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

          {/* 탭 콘텐츠 */}
          <Box>
            <Tabs
              value={tabValue}
              onChange={(_, v) => setTabValue(v)}
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
                {traits.map((trait, idx) => {
                  const meta = TRAIT_META[idx] ?? TRAIT_META[0];
                  return (
                    <Card
                      key={trait.title}
                      elevation={0}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: meta.bg,
                        transition: `transform 0.2s ease, box-shadow 0.2s ease, opacity 0.45s ease ${0.1 + idx * 0.12}s`,
                        opacity: isVisible ? 1 : 0,
                        '&:hover': {
                          transform: 'translateX(6px)',
                          boxShadow: 2,
                        },
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
                        <Box sx={{ color: meta.color, mt: 0.25, flexShrink: 0 }}>
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
                })}
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
