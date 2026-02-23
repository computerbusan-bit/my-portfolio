import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionTitle from '../components/SectionTitle';
import ContactSection from '../components/ContactSection';
import { supabase } from '../utils/supabase';

const THUM_BASE = 'https://image.thum.io/get/width/600/crop/400/';

const skills = [
  { icon: <CodeIcon />, title: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS'] },
  { icon: <BrushIcon />, title: 'Design', items: ['Figma', 'MUI', 'Responsive Design', 'UI/UX'] },
  { icon: <StorageIcon />, title: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'REST API'] },
  { icon: <WebIcon />, title: 'Tools', items: ['Git', 'Vite', 'VS Code', 'Vercel'] },
];

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, tech_stack, detail_url, sort_order')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) {
        setProjectsError('프로젝트를 불러오는 데 실패했습니다.');
      } else {
        setProjects(data ?? []);
      }
      setProjectsLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <>
      {/* 1. Hero Section */}
      <Box
        id="hero"
        sx={{
          bgcolor: 'secondary.main',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: 'info.main',
            opacity: 0.3,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 150,
            height: 150,
            borderRadius: '50%',
            bgcolor: 'error.main',
            opacity: 0.3,
          }}
        />
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography
            variant="body1"
            sx={{ color: 'primary.main', fontWeight: 700, mb: 1, fontSize: '1.1rem' }}
          >
            안녕하세요, 반갑습니다
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              color: 'primary.main',
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Creative Developer
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: 'common.white', mb: 4, fontWeight: 400, lineHeight: 1.6 }}
          >
            사용자 경험을 중심으로 아름답고 기능적인 웹을 만듭니다.
            <br />
            포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              href="#projects"
              sx={{
                bgcolor: 'primary.main',
                color: 'common.white',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              프로젝트 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#contact"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'rgba(74, 26, 138, 0.1)',
                  borderColor: 'primary.main',
                },
              }}
            >
              연락하기
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 2. About Me Section */}
      <Box id="about" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <SectionTitle subtitle="저에 대해 간단히 소개합니다">About Me</SectionTitle>
          <Card
            sx={{
              bgcolor: 'background.paper',
              p: { xs: 3, md: 5 },
              textAlign: 'center',
              border: '2px dashed',
              borderColor: 'custom.borderLight',
            }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 2 }}>
                안녕하세요! 저는 웹 개발에 열정을 가진 프론트엔드 개발자입니다.
                사용자 중심의 인터페이스를 설계하고, 깔끔한 코드로 구현하는 것을 좋아합니다.
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                React, TypeScript, MUI 등 모던 웹 기술을 활용하여
                반응형이고 접근성 높은 웹 애플리케이션을 만들고 있습니다.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* 3. Skills Section */}
      <Box id="skills" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'primary.main' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'common.white', mb: 1 }}>
              Skills
            </Typography>
            <Typography variant="body1" sx={{ color: 'secondary.main' }}>
              주요 기술 스택입니다
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={skill.title}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Box sx={{ color: 'secondary.main', mb: 2, '& svg': { fontSize: 40 } }}>
                    {skill.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: 'common.white', mb: 2, fontWeight: 700 }}>
                    {skill.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {skill.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255, 105, 180, 0.2)',
                          color: 'common.white',
                          fontWeight: 500,
                          border: '1px solid rgba(255, 105, 180, 0.4)',
                        }}
                      />
                    ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. Projects Section */}
      <Box id="projects" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <SectionTitle subtitle="그동안 작업한 프로젝트들입니다">Projects</SectionTitle>

          {projectsLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {projectsError && (
            <Alert severity="error" sx={{ mb: 3 }}>{projectsError}</Alert>
          )}

          {!projectsLoading && !projectsError && (
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid size={{ xs: 12, sm: 6 }} key={project.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(74, 26, 138, 0.18)',
                      },
                    }}
                  >
                    {/* 썸네일 - image.thum.io 실시간 스크린샷 */}
                    <Box
                      component="a"
                      href={project.detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ display: 'block', textDecoration: 'none' }}
                    >
                      <CardMedia
                        component="img"
                        image={`${THUM_BASE}${project.detail_url}`}
                        alt={`${project.title} 스크린샷`}
                        sx={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          bgcolor: 'grey.100',
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2.5, lineHeight: 1.7, color: 'text.secondary' }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {project.tech_stack.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ fontWeight: 500 }}
                          />
                        ))}
                      </Box>
                    </CardContent>

                    <CardActions sx={{ px: 3, pb: 3 }}>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<OpenInNewIcon />}
                        href={project.detail_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        component="a"
                        sx={{ borderRadius: 2 }}
                      >
                        사이트 보기
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* 5. Contact Section */}
      <ContactSection />
    </>
  );
}

export default HomePage;
