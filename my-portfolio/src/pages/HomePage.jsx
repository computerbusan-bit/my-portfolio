import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import SectionTitle from '../components/SectionTitle';

const skills = [
  { icon: <CodeIcon />, title: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS'] },
  { icon: <BrushIcon />, title: 'Design', items: ['Figma', 'MUI', 'Responsive Design', 'UI/UX'] },
  { icon: <StorageIcon />, title: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'REST API'] },
  { icon: <WebIcon />, title: 'Tools', items: ['Git', 'Vite', 'VS Code', 'Vercel'] },
];

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
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
              component={Link}
              to="/projects"
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

      {/* About Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
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

      {/* Skills Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'primary.main' }}>
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

      {/* Contact Section */}
      <Box id="contact" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <SectionTitle subtitle="언제든 연락 주세요">Contact</SectionTitle>
          <Card sx={{ textAlign: 'center', p: { xs: 3, md: 5 } }}>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
                프로젝트 협업이나 문의사항이 있으시면
                아래 채널로 편하게 연락해 주세요.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<EmailIcon />}
                  href="mailto:hello@example.com"
                  sx={{ px: 3 }}
                >
                  Email
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href="https://github.com"
                  target="_blank"
                  sx={{
                    px: 3,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'rgba(74, 26, 138, 0.05)' },
                  }}
                >
                  GitHub
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
