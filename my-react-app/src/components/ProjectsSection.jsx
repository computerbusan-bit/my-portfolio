import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  Skeleton,
  Alert,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { supabase } from '../utils/supabase';
import useIntersection from '../hooks/useIntersection';

const THUM_BASE = 'https://image.thum.io/get/width/600/crop/338/';

const ProjectCardSkeleton = () => (
  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
    <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '16 / 9' }} />
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" width="55%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" width={56} height={24} />
        <Skeleton variant="rounded" width={56} height={24} />
        <Skeleton variant="rounded" width={56} height={24} />
      </Box>
    </CardContent>
    <Box sx={{ px: 3, pb: 3 }}>
      <Skeleton variant="rounded" width={100} height={34} />
    </Box>
  </Card>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerRef, headerVisible] = useIntersection();
  const [cardsRef, cardsVisible] = useIntersection(0.05);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('id, title, description, tech_stack, detail_url, sort_order')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (fetchError) {
        setError('프로젝트를 불러오는 데 실패했습니다.');
      } else {
        setProjects(data ?? []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <Box
      id="projects"
      component="section"
      sx={{ py: { xs: 10, md: 14 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* 섹션 헤더 */}
        <Box
          ref={headerRef}
          sx={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            mb: 6,
          }}
        >
          <Typography
            variant="body2"
            color="primary"
            fontWeight={600}
            sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1 }}
          >
            Projects
          </Typography>
          <Typography variant="h2" sx={{ mb: 1.5 }}>
            직접 만든 것들
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440 }}>
            아이디어를 코드로 구현한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 에러 */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 스켈레톤 로딩 */}
        {loading && (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <ProjectCardSkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 프로젝트 카드 */}
        {!loading && !error && (
          <Box ref={cardsRef}>
            <Grid container spacing={3}>
              {projects.map((project, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={project.id}>
                  <Card
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      opacity: cardsVisible ? 1 : 0,
                      transform: cardsVisible ? 'translateY(0)' : 'translateY(28px)',
                      transitionDelay: cardsVisible ? `${index * 0.1}s` : '0s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                        borderColor: 'primary.light',
                      },
                    }}
                  >
                    {/* 16:9 썸네일 */}
                    <Box
                      component="a"
                      href={project.detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        overflow: 'hidden',
                        borderRadius: '16px 16px 0 0',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={`${THUM_BASE}${project.detail_url}`}
                        alt={`${project.title} 스크린샷`}
                        sx={{
                          width: '100%',
                          aspectRatio: '16 / 9',
                          objectFit: 'cover',
                          objectPosition: 'top',
                          bgcolor: 'grey.100',
                          transition: 'transform 0.35s ease',
                          '&:hover': { transform: 'scale(1.03)' },
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Typography variant="h3" gutterBottom sx={{ fontSize: '1.125rem' }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
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
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProjectsSection;
