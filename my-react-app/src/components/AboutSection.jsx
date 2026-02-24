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

// ─── 데이터 ─────────────────────────────────────────────────────────────────

const ABOUT_DATA = {
  basicInfo: {
    name: '김하미',
    role: '프론트엔드 개발자',
    education: 'Northumbria University / Multidisciplinary Innovation MA',
    major: '산업디자인 · Multidisciplinary Innovation',
    experience: '신입 · 1년차',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      showInHome: false,
    },
  ],
};

const TRAITS = [
  {
    icon: <ExploreIcon sx={{ fontSize: 28 }} />,
    title: '호기심 탐구',
    desc: '새로운 기술을 마주치면 왜, 어떻게 동작하는지 끝까지 파고듭니다.',
    color: 'primary.main',
    bg: 'rgba(25, 118, 210, 0.05)',
  },
  {
    icon: <TrackChangesIcon sx={{ fontSize: 28 }} />,
    title: '목표 완수',
    desc: '목표를 세우면 반드시 이루려고 노력합니다. 포기보다는 방법을 찾습니다.',
    color: 'secondary.main',
    bg: 'rgba(220, 0, 78, 0.05)',
  },
  {
    icon: <DirectionsRunIcon sx={{ fontSize: 28 }} />,
    title: '움직이면 해결',
    desc: '막히면 일단 일어납니다. 몸을 쓰고 돌아오면 의외로 답이 보이더라고요.',
    color: '#ed6c02',
    bg: 'rgba(237, 108, 2, 0.05)',
  },
];

const INFO_ROWS = [
  { Icon: SchoolIcon, label: '학력', value: ABOUT_DATA.basicInfo.education },
  { Icon: MenuBookIcon, label: '전공', value: ABOUT_DATA.basicInfo.major },
  { Icon: WorkIcon, label: '경력', value: ABOUT_DATA.basicInfo.experience },
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

  const homeSections = ABOUT_DATA.sections.filter((s) => s.showInHome);

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
            <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 }, '&:last-child': { pb: { xs: 3, sm: 4, md: 5 } } }}>
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
                  src={ABOUT_DATA.basicInfo.photo || undefined}
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
                    <Typography variant="h3">{ABOUT_DATA.basicInfo.name}</Typography>
                    <Chip
                      label={ABOUT_DATA.basicInfo.role}
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
                        sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
                      >
                        <Box
                          sx={{
                            color: 'text.disabled',
                            display: 'flex',
                            alignItems: 'center',
                            flexShrink: 0,
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
                        <Typography variant="body2" color="text.primary">
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
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, fontSize: '1.05rem' }}
                  >
                    호기심이 많고 배우는 것을 좋아합니다.
                    새로운 기술을 접하면 직접 만들어보며 이해하고,
                    목표가 생기면 어떻게든 해내려는 사람입니다.
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                    개발하다 막히는 순간이 오면 잠깐 자리를 떠납니다.
                    산책을 하거나 운동을 하고 나서 다시 코드를 보면
                    신기하게도 해결 방법이 보이더라고요.
                    그렇게 저는 오늘도 해냅니다.
                  </Typography>
                </Box>

                {/* 슬로건 인용 박스 */}
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    borderRadius: 3,
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    position: 'relative',
                  }}
                >
                  <FormatQuoteIcon
                    sx={{
                      color: 'primary.light',
                      fontSize: 36,
                      mb: 1,
                      opacity: 0.6,
                    }}
                  />
                  <Typography
                    variant="h3"
                    color="primary.dark"
                    sx={{ lineHeight: 1.6, fontStyle: 'italic' }}
                  >
                    막히면 일단 움직입니다.
                    <br />
                    그리고 다시, 해냅니다.
                  </Typography>
                </Box>
              </Box>
            </TabPanel>

            {/* 탭 1: 개발 철학 */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {TRAITS.map((trait) => (
                  <Card
                    key={trait.title}
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: trait.bg,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
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
                      <Box sx={{ color: trait.color, mt: 0.25, flexShrink: 0 }}>
                        {trait.icon}
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ mb: 0.5 }}>
                          {trait.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {trait.desc}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
