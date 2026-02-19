import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import SectionTitle from '../components/SectionTitle';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'React와 MUI로 제작한 개인 포트폴리오 웹사이트입니다. Feastie 컬러 팔레트를 적용하여 활기차고 트렌디한 디자인으로 구성했습니다.',
    tags: ['React', 'MUI', 'Vite'],
    color: 'secondary.main',
  },
  {
    title: 'Project 2',
    description: '준비 중인 프로젝트입니다. 이 공간에 새로운 작품이 추가될 예정입니다. 기대해 주세요!',
    tags: ['Coming Soon'],
    color: 'info.main',
  },
  {
    title: 'Project 3',
    description: '준비 중인 프로젝트입니다. 다양한 기술 스택을 활용한 프로젝트가 곧 업데이트됩니다.',
    tags: ['Coming Soon'],
    color: 'error.main',
  },
  {
    title: 'Project 4',
    description: '준비 중인 프로젝트입니다. 새로운 아이디어와 기술을 실험하는 공간입니다.',
    tags: ['Coming Soon'],
    color: 'success.main',
  },
];

function ProjectsPage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <SectionTitle subtitle="그동안 작업한 프로젝트들입니다">Projects</SectionTitle>
        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(74, 26, 138, 0.15)',
                  },
                }}
              >
                {/* Color bar */}
                <Box sx={{ height: 6, bgcolor: project.color }} />
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7, color: 'text.secondary' }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(74, 26, 138, 0.08)',
                          color: 'primary.main',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<GitHubIcon />}
                      sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                      Code
                    </Button>
                    <Button
                      size="small"
                      startIcon={<LaunchIcon />}
                      sx={{ color: 'secondary.dark', fontWeight: 600 }}
                    >
                      Demo
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
